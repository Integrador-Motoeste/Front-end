# Motocar

Este é um guia para inicialização local do front-end mobile do projeto Motocar

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (para projetos Expo)
- [Android Studio](https://developer.android.com/studio) e/ou [Xcode](https://developer.apple.com/xcode/) para rodar o projeto usando um emulador Android
- [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&pli=1) para rodar o projeto em seu dispositivo android

## Instalação

Siga os passos abaixo para clonar e configurar o projeto localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/Integrador-Motoeste/Front-end.git

   cd Front-end

2. Instalar depedências
   ```bash
   npm i
   # ou
   yarn add

3. Criação de um arquivo .env na raiz do projeto com os seguintes dados
    ```bash
    # Urls do backend
    EXPO_PUBLIC_BACKEND_URL=http://seu_ip:8000 
    EXPO_PUBLIC_WS_BACKEND_URL=ws://seu_ip:8000
    # Api do google maps
    EXPO_PUBLIC_GOOGLE_API_KEY=sua_chave_da_api_do_google

4. Rode o projeto
    ```bash
    npm run android
    # ou
    npx expo start
