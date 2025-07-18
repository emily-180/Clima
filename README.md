# 🌤️ App Clima – Projeto de Sistemas de Informação

Desenvolvido por **Emily Ferreira** e **Sabrina Souza**

Este projeto exibe a previsão do tempo consultando dados da **API do INPE**. Ele é dividido em:

- **Back-End**: Desenvolvido com Spring Boot, responsável por buscar e processar os dados do INPE.
- **Front-End**: Desenvolvido com React + Vite, exibe os dados de forma amigável. Está hospedado na **Vercel**.

---

## 🔙 Back-End (Java)
**Repositório:** [ClimaJava](https://github.com/emily-180/ClimaJava)

**Tecnologias:**
- Spring Boot
- API XML do INPE
- XStream (parser XML)
- Eclipse IDE
- Maven

---

## 🔜 Front-End (React)
**Repositório:** [Clima](https://github.com/emily-180/Clima)

**Tecnologias:**
- React + Vite
- Axios
- Deploy via Vercel

---

## 🧭 Como Rodar o Projeto

### 🔧 Etapas para o Back-End funcionar:

1. **Clonar o repositório Java no Eclipse:**
   
2. **Importar como projeto Maven.**
- `File > Import > Existing Maven Projects`
- Escolher o diretório clonado

3. **Instalar dependências e limpar o projeto:**
- Clicar com o botão direito no projeto > `Run As > Maven clean`
- Depois: `Run As > Maven install`

4. **Rodar a aplicação:**
- Executar a classe `AppClimaApplication.java` como Java Application

  
### 🌐 Visualizar no navegador

1. **Acesse o front-end hospedado na Vercel:**
https://clima-pi-seven.vercel.app/

📌 *Projeto acadêmico desenvolvido para a disciplina de Sistemas Computacionais Distribuídos no curso de Sistemas de Informação – IFSULDEMINAS.*

