# Frontend de Oficina de Integração 2 - ELLP UTFPR CP

Este é o frontend do projeto de Oficina de Integração 2, desenvolvido para o ELLP UTFPR CP.

## 🚀 Tecnologias Utilizadas

- Next.js 15.3.3
- React 19
- TypeScript
- Tailwind CSS
- NextAuth.js
- React Hook Form
- Jest para testes
- ESLint para linting

## 📋 Pré-requisitos

- Node.js (versão LTS recomendada)
- npm

## 🔧 Instalação

1. Instale as dependências:
```bash
npm install
# ou
yarn install
```

2. Crie o arquivo .env.local com os valores
```
NEXT_PUBLIC_API_URL=https://meninasdigitais.onrender.com
NEXTAUTH_SECRET=T0K3NSUP3Rsecr3t0
NEXTAUTH_URL=http://localhost:3000
```

## 🏃‍♂️ Como Executar

### Ambiente de Desenvolvimento
Para rodar o projeto em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em `http://localhost:3000`

```

## 🧪 Testes

O projeto utiliza Jest para testes. Você pode executar os testes de diferentes formas:

```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage

```

## 📝 Linting

Para verificar o código com ESLint:

```bash
npm run lint
```
