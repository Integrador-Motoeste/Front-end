import React, { createContext, ReactNode, useEffect, useState } from "react";
import AuthService from "@/app/services/auth";
import UserService from "@/app/services/user";
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
    signUp: (email: string, password1: string, password2: string, first_name: string, last_name: string, cpf: string, picture: any) => { },
    turnPilot: (data: any) => { },
    isLoading: true,
    userToken: null as string | null,
    user: null as UserInterface | null,
});


// Defina o tipo para o AuthContext
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userRefreshToken, setUserRefreshToken] = useState<string | null>(null);

    const redirect_to_app = (user: UserInterface) => {
        if (user?.groups.includes(2)) {
            router.replace("/(app)/(pilot)");
        } else {
            router.replace("/(app)/(passenger)");
        }
    }

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
            setIsLoading(false);

            AsyncStorage.setItem("userToken", response.data.access);
            AsyncStorage.setItem("userRefreshToken", response.data.refresh);
            AsyncStorage.setItem("user", JSON.stringify(response.data.user));

            redirect_to_app(response.data.user);
        } else {
            console.error("Erro ao fazer login: Resposta inesperada", response);
            router.replace("/");
        }
      };

    const signUp = async (email: string, password1: string, password2: string, first_name: string, last_name: string, cpf: string, picture: any) => {
        setIsLoading(true);
        const authService = new AuthService("");
        
        const data = {
          'email': email,
          'password1': password1,
          'password2': password2,
          'first_name': first_name,
          'last_name': last_name,
          'cpf': cpf,
          'picture': picture
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
        const response = await authService.logout();
        if (response && response.status === 200) {
        setIsLoading(true)
        AsyncStorage.removeItem("userToken");
        setUser(null);
        setUserToken(null);
        setUserRefreshToken(null);
        setIsLoading(false);
        router.replace("/(app)")
    } else {
            console.error("Erro ao fazer logout: Resposta inesperada", response);
        }
    }

    const turnPilot = async (data: any) => {
        setIsLoading(true);
        const userService = new UserService({ userToken } as unknown as string);
        const response = await userService.turn_pilot(data);
        if (response && response.status === 200) {
            setIsLoading(false);
            const response = await userService.getUser(user.id);
            setUser(response.data);
            AsyncStorage.setItem("user", JSON.stringify(response.data));
            redirect_to_app(response.data);
        } else {
            console.error("Erro ao virar piloto: Resposta inesperada", response);
        }
    }

    useEffect(() => {
        const loadStorageData = async () => {
            setIsLoading(true);
            const user = await AsyncStorage.getItem("user");
            const token = await AsyncStorage.getItem("userToken");
            const refreshToken = await AsyncStorage.getItem("userRefreshToken");
            if (user) {
                setUserToken(token);
                setUser(JSON.parse(user));
                setUserRefreshToken(refreshToken);

                redirect_to_app(JSON.parse(user));
            }
            setIsLoading(false);
        };
        loadStorageData();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, user, signUp, turnPilot }}>
            {children}
        </AuthContext.Provider>
    );
};