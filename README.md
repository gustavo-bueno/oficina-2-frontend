# Oficina 2 Frontend - ELLP UTFPR CP
Sistema de gerenciamento de participantes e certificados para o ELLP UTFPR CP.

## 🛠️ Stack

- Next.js 15.3.3
- React 19
- TypeScript
- Tailwind CSS
- NextAuth.js
- React Hook Form + Yup
- Jest

## ⚡ Setup

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://oficina2-1fkt.onrender.com
NEXTAUTH_SECRET=T0K3NSUP3Rsecr3t0
NEXTAUTH_URL=http://localhost:3000
```

3. **Executar:**
```bash
npm run dev
```

Acesse: `http://localhost:3000`

## 🧪 Testes

```bash
npm run test          
npm run test:watch    
npm run test:coverage 
```

## 📋 Funcionalidades

- **Autenticação** com NextAuth.js
- **Gerenciamento de participantes** (CRUD)
- **Geração de certificados** em PDF
- **Validação de formulários** com Yup
- **Interface responsiva** com Tailwind CSS
