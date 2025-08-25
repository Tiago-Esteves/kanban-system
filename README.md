````md
# Kanban System - Java Spring Boot + React  
🚀 **Acesse a aplicação online**  
🔗 *Link da demo:* Em breve  
*(a aplicação será hospedada assim que finalizada)*  

Este projeto é um sistema de gerenciamento de tarefas estilo Kanban, com **backend em Java Spring Boot** e **frontend em React**. Ele simula um quadro de tarefas com colunas como **"A começar"**, **"Em andamento"**, **"Finalizado"** e **"Atrasado"**.  

---

## ✨ Funcionalidades  
### Backend  
📌 Cadastro, edição e exclusão de tarefas  
📊 Organização por status: *A começar*, *Em andamento*, *Finalizado*, *Atrasado*  
🔄 API RESTful para integração com frontend  
💾 Persistência de dados com JPA + MySQL  

### Frontend (em desenvolvimento)  
🎨 Layout Kanban responsivo com colunas e cartões de tarefas  
📂 Listagem de tarefas separadas por status  
📌 Organização visual das tarefas usando **React** e **Tailwind CSS**  
🖱️ Funcionalidade de **Drag & Drop** para reorganizar tarefas  
🌙 Alteração de **temas (claro/escuro)** para melhor experiência do usuário  

---

## 🧰 Tecnologias utilizadas  
**Backend:**  
- Java 17  
- Spring Boot  
- Spring Data JPA  
- MySQL  
- Maven  
- Eclipse IDE  

**Frontend:**  
- React  
- Tailwind CSS  
- Vite (para desenvolvimento rápido)  
- Node.js / npm  

---

## ⚙️ Como executar localmente  

### ✅ Pré-requisitos  
Antes de começar, certifique-se de ter instalado em sua máquina:  
- [Java 17+](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)  
- [Maven](https://maven.apache.org/)  
- [MySQL](https://dev.mysql.com/downloads/)  
- [Node.js + npm](https://nodejs.org/)  

---

### 🔹 Backend  
```bash
# Clonar o repositório
git clone https://github.com/Tiago-Esteves/kanban-system.git
cd kanban-system

# Instalar dependências
mvn install

# Rodar o projeto
mvn spring-boot:run
````

O backend estará rodando em: **[http://localhost:8080](http://localhost:8080)**

---

### 🔹 Frontend

```bash
# Entrar na pasta do frontend
cd frontend

# Instalar dependências
npm install

# Rodar o projeto
npm run dev
```

O frontend estará rodando em: **[http://localhost:5173](http://localhost:5173)**

---

## 📌 Observações

* Configure o **application.properties** do Spring Boot para apontar para seu banco MySQL local antes de rodar o backend.
* As tabelas serão criadas automaticamente pelo JPA/Hibernate.
* O frontend ainda está em desenvolvimento e será integrado ao backend nas próximas versões.

---

## 🚀 Roadmap (próximas melhorias)

* 🔐 Sistema de autenticação com usuários e login
* ☁️ Deploy em nuvem (Render, Railway ou AWS)

```

