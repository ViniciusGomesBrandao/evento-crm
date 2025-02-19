# Evento CRUD - Laravel + Docker

Este é um projeto básico de CRUD (Create, Read, Update, Delete) para gerenciar eventos, utilizando Laravel no backend e um frontend em Vite/React. O projeto é containerizado utilizando Docker, facilitando o desenvolvimento e a execução em qualquer ambiente.

## Funcionalidades

Este projeto permite a gestão de eventos com as seguintes funcionalidades:

- **Listagem de eventos**: Exibe todos os eventos cadastrados.
- **Cadastro de eventos**: Permite adicionar novos eventos ao sistema.
- **Edição de eventos**: Possibilita a atualização das informações de eventos existentes.
- **Remoção de eventos**: Permite a exclusão de eventos.

## Tecnologias Utilizadas

- **Backend**: Laravel 8, PHP 8.2, MySQL 8.0
- **Frontend**: Vite, React 18
- **Containerização**: Docker (Docker Compose)
- **Servidor Web**: Nginx
- **Gestão de Dependências**: Composer (para Laravel), npm (para o frontend)

## Pré-Requisitos

- **Docker** e **Docker Compose** instalados em sua máquina.
- **Node.js** e **npm** (para o frontend, se você desejar rodar separadamente).
- **PHP** e **Composer** (para o backend, se você desejar rodar separadamente).

## Como Executar o Projeto

### 1. Clonar o Repositório

Clone este repositório para sua máquina:

```bash
git clone https://github.com/seu-usuario/evento-crm.git
cd evento-crm
```

### 2. Construir e Subir os Containers
Para construir os containers e iniciar o ambiente Docker, rode:
```bash
docker compose up --build
```

### 3. Acessar o Container do Backend
Depois que o Docker terminar de construir e rodar os containers, entre no container do backend e rode:
```bash
docker exec -it event-app bash
```
### 4. Executar as Migrations
Com o container do backend em funcionamento, rode as migrations para configurar o banco de dados
```bash
php artisan migrate
```

### 5. Acessar a API e o Frontend
Após a execução das migrations, a API estará disponível em:

API (Backend): http://localhost:9000/api
Frontend (React): http://localhost:5173/login
