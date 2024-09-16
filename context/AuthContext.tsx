import React, { createContext, ReactNode, useContext, useState } from "react";
import AuthService from "@/app/services/auth";
import axios from "axios";
import { router } from "expo-router";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { Use } from "react-native-svg";


interface UserInterface {
    id: number;
    email: string;
    groups: number[];
    balance: Float;
    first_name: string;
    last_name: string;
    latitude: Float;
    longitude: Float;
    cpf: string;
    picture: string;
    stauts: "INACTIVE" | "ACTIVE" | "BUSY";
    username: string;
    cnh: string;
}

export const AuthContext = createContext({
    login: (email: string, password: string) => { },
    logout: () => { },
    isLoading: true,
    userToken: null as string | null,
    user: null as UserInterface | null,
});


// Defina o tipo para o AuthContext
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserInterface | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userRefreshToken, setUserRefreshToken] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        console.log("Fazendo login no context...");
        const authService = new AuthService("");
        try {
          const response = await axios.post("http://192.168.0.16:8000/dj-rest-auth/login/", { email, password });
          if (response && response.status === 200) {
            setUserToken(response.data.access);
            setUserRefreshToken(response.data.refresh);
            setUser(response.data.user);
            console.log("Login feito com sucesso:", response.data.user);
            if (user?.groups[0] === 1) {
              router.replace("/(passenger)");
            }
          } else {
            console.error("Erro ao fazer login: Resposta inesperada", response);
          }
        } catch (error: any) {
          console.error("Erro ao fazer login:", error.message);
        } finally {
          setIsLoading(false);
        }
      };

    const logout = () => {
        setUser(null);
        setUserToken(null);
        setUserRefreshToken(null);
    }

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, user }}>
            {children}
        </AuthContext.Provider>
    );
};