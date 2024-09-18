import React, { createContext, ReactNode, useEffect, useState } from "react";
import AuthService from "@/app/services/auth";
import { router } from "expo-router";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    signUp: (email: string, password1: string, password2: string, first_name: string, last_name: string) => { },
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
        const data = {
          'email': email,
          'password': password
        }

        const response = await authService.login(data)

        if (response && response.status === 200) {
            setUserToken(response.data.access);
            setUserRefreshToken(response.data.refresh);
            setUser(response.data.user);
            AsyncStorage.setItem("userToken", response.data.access);
            console.log("Login feito com sucesso:", response.data.user);

            if (response.data.user.groups[0] === 1) {
              router.replace("(app)/(passenger)");
            } else {
              router.replace("(app)/(pilot)");
            }
        } else {
            console.error("Erro ao fazer login: Resposta inesperada", response);
            router.replace("/");
        }
      };

    const signUp = async (email: string, password1: string, password2: string, first_name: string, last_name: string) => {
        setIsLoading(true);
        console.log("Fazendo login no context...");
        const authService = new AuthService("");
        
        const data = {
          'email': email,
          'password1': password1,
          'password2': password2,
          'first_name': first_name,
          'last_name': last_name
        }

        const response = await authService.signUpUser(data)

        if (response && response.status === 201) {
            login(email, password1);
        } else {
            console.error("Erro ao fazer cadastro: Resposta inesperada", response);
            router.replace("/");
        }
      }

    const logout = async () => {
      const authService = new AuthService({ userToken } as unknown as string);
      const response = await authService.logout()
      if (response && response.status === 200) {
        console.log("Logout feito com sucesso");
        setIsLoading(true)
        AsyncStorage.removeItem("userToken");
        setUser(null);
        setUserToken(null);
        setUserRefreshToken(null);
        setIsLoading(false);
        } else {
            console.error("Erro ao fazer logout: Resposta inesperada", response);
        }
    }

    useEffect(() => {
        const loadStorageData = async () => {
            const token = await AsyncStorage.getItem("userToken");
            if (token) {
                setUserToken(token);
            }
            setIsLoading(false);
        };
        loadStorageData();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, user, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};