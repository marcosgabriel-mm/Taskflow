# API de Lembretes com Autenticação JWT

Esta é uma API RESTful para gerenciar lembretes, com suporte à autenticação baseada em JSON Web Tokens (JWT). Cada usuário tem seus lembretes armazenados separadamente, garantindo privacidade e organização.

## Recursos

- **Autenticação JWT**: Os usuários se autenticam através de tokens JWT.
- **Gerenciamento de Lembretes**: CRUD (Criar, Ler, Atualizar e Deletar) de lembretes.
- **Multiusuário**: Cada usuário possui seus próprios lembretes, separados dos demais.

## Endpoints

### Autenticação

#### Registro de Usuário
**POST /user/register**
- Registra um novo usuário.

**Exemplo de corpo da requisição:**
```json
{
	"name": "Marcos Gabriel",
	"email": "marcos.mauricio@example.com",
	"password": "senhaforte123!"
}
```

**Resposta:**
```json
{
	"name": "Marcos Gabriel",
	"email": "marcos.mauricio@example.com"
}
```

#### Login de Usuário
**POST /user/login**
- Autentica um usuário e retorna um token JWT.

**Exemplo de corpo da requisição:**
```json
{
	"email": "marcos.mauricio@example.com",
	"password": "senhaforte123!"
}
```

**Resposta:**
```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5IkpXVCJ9.eyJpZCI6MiwibmF6Ik1hc..."
}
```

### Lembretes
- **Autenticação**: Necessária (Header `Authorization: Bearer <token>`).


#### Criar Lembrete
**POST /task**
- Adiciona um novo lembrete.

**Exemplo de corpo da requisição:**
```json
{
	"title" : "Testando API",
	"description": "Essa é uma API simples de notas/lembretes no qual existe autenticação JWT",
	"status": "Concluida",
	"dueDate": "01-12-2025 23:59:59"
}
```

**Resposta:**
```json
{
	"id": 2,
	"title": "Testando API",
	"description": "Essa é uma API simples de notas/lembretes no qual existe autenticação JWT",
	"status": "Concluida",
	"dueDate": "2025-01-13T02:59:59.000Z"
}
```

#### Listar Lembretes
**GET /task**
- Retorna todos os lembretes do usuário autenticado.

**Resposta:**
```json
[
	{
		"id": 1,
		"title": "Serentia",
		"description": "Uma cidade estranha e ambiciosa",
		"status": "Não finalizado",
		"dueDate": "2025-02-05T15:00:00.000Z",
		"user_id": 1,
		"createdAt": "2025-01-12T23:39:21.783Z",
		"updatedAt": "2025-01-12T23:51:59.038Z"
	}
]
```

#### Atualizar Lembrete
**PUT /tasks/{id}**
- Atualiza um lembrete específico.

**Exemplo de corpo da requisição:**
```json
{
	"title" : "Editando lembrete",
	"description": "Algo que devo me lembrar no futuro",
	"status": "Pendente",
	"dueDate": "07-23-2025 17:00:00"
}
```

**Resposta:**
```json
{
	"id": 1,
	"title": "Editando lembrete",
	"description": "Algo que devo me lembrar no futuro",
	"status": "Pendente",
	"dueDate": "2025-07-23T20:00:00.000Z"
}
```

#### Deletar Lembrete
**DELETE /reminders/{id}**
- Remove um lembrete específico.

**Resposta:**
```json
{
	"message": "Tarefa deletada com sucesso!"
}
```

## Configuração e Execução

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd <nome-do-diretorio>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
    DB_DIALECT=postgres
    DB_HOST=<host_do_banco>
    DB_PORT=5432 || <porta_do_banco>
    DB_USERNAME=<nome_do_usuario>
    DB_PASSWORD=<senha_para_entrar_no_banco>
    DB_DATABASE=<nome_do_banco>

    JWT_SECRET=<jwtkey>
   ```

4. Inicie o servidor:
   ```bash
   npm start
   # ou
   nodemon server
   ```

5. Acesse a API em: `http://localhost:3000`.

## Tecnologias Utilizadas

- Node.js.
- JWT para autenticação.
- Banco de dados relacional (PostgreSQL).

## Melhorias Futuras Pensadas

- Suporte a categorias para lembretes.
- Notificações push ou via e-mail.
- Integração com aplicações mobile ou web.

