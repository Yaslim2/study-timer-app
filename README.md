# 📚 Study Timer

Study Timer é uma ferramenta desenvolvida com Next.js e TailwindCSS para auxiliar no controle do tempo de estudo. O projeto permite que os usuários registrem suas sessões de estudo, associando-as a disciplinas e temas específicos. O tempo estudado é armazenado no LocalStorage, garantindo persistência dos dados entre acessos.

## ✨ Tecnologias Utilizadas

- **Next.js**: Framework para React, utilizado para criar a aplicação.
- **TypeScript**: Para melhor tipagem e manutenção do código.
- **ShadCN/UI**: Biblioteca de componentes para estilização e usabilidade.
- **Context API**: Utilizado para gerenciamento de estado global.
- **LocalStorage**: Para persistência dos dados do temporizador e histórico de estudo.
- **Recharts**: Biblioteca para exibição de gráficos de estudo por disciplina e por mês.

## 🚀 Funcionalidades

### 🎯 Cronômetro de Estudo

- O usuário pode iniciar, pausar e resetar o cronômetro.
- O tempo é salvo no LocalStorage para persistir entre sessões.

### 📂 Seleção de Disciplina e Tema

- O usuário escolhe uma disciplina e um tema antes de iniciar o estudo.
- Os temas são carregados dinamicamente com base na disciplina selecionada.
- A seleção é armazenada no LocalStorage.

### 📊 Estatísticas de Estudo

- Os tempos de estudo são registrados e agrupados por disciplina.
- Para cada disciplina, é gerado um gráfico exibindo os minutos estudados em cada mês.

### 🗄️ Persistência de Dados

- Os dados do temporizador, disciplina e tema são salvos no LocalStorage.
- Os tempos registrados são armazenados e organizados por disciplina e mês.

## 📦 Estrutura do Projeto

```
root
├── src
│   ├── components  # Componentes reutilizáveis
│   ├── context     # Contexto global
│   ├── app         # Páginas da aplicação
│   ├── lib         # Funções auxiliares
│   ├── styles      # Estilização do projeto
│   └── mocked-data # Dados simulados para teste
├── public          # Assets públicos
├── README.md       # Documentação do projeto
└── package.json    # Dependências do projeto
```

## 🛠️ Instalação e Uso

1. Clone o repositório:

   ```bash
   git clone https://github.com/Yaslim2/study-timer-app
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd study-timer-app
   ```

3. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

4. Inicie o projeto:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Acesse no navegador:
   ```
   http://localhost:3000
   ```

## 📝 Contribuição

Sinta-se à vontade para abrir issues e enviar pull requests para melhorias!

## 📄 Licença

Este projeto está sob a licença MIT.
