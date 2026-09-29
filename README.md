📚 Aula 07 — API de Inventário
Introdução

Nesta aula, vamos criar uma API de inventário usando Node.js e Express. O sistema permitirá cadastrar, consultar, alterar e excluir itens, utilizando um arquivo JSON para armazenar os dados.

1. Criar o projeto

Crie a pasta:

aula7_pbe1

Dentro dela:

aula7_pbe1
├── cliente
├── servidor
├── dados.json
└── package.json
2. Criar o arquivo dados.json

Esse arquivo será nossa "base de dados":

[
  {
    "id": 1,
    "item": "Notebook Dell",
    "local": "Laboratório 01",
    "dataRegistro": "2026-09-01",
    "valor": 3500.00,
    "patrimonio": "PAT-00125"
  },
  {
    "id": 2,
    "item": "Projetor Epson",
    "local": "Sala 03",
    "dataRegistro": "2026-09-03",
    "valor": 2800.00,
    "patrimonio": "PAT-00126"
  }
]
3. Instalar o Express

No terminal, dentro da pasta do projeto:

npm init -y

Depois:

npm install express
4. Criar o server.js

Dentro da pasta servidor, crie:

server.js

E importe o Express e os dados:

const express = require("express");
const Inventario = require("../dados.json");
5. Configurar o servidor
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const porta = 5000;

Isso permite que o servidor receba dados enviados em JSON.

6. Criar o GET — listar

Para mostrar todos os itens:

const mostrarInventario = (req, res) => {
    res.json(Inventario);
};

Rota:

app.get("/", mostrarInventario);
7. Criar o POST — cadastrar

O POST recebe os dados pelo req.body:

const novoInventario = (req, res) => {
    const novoId = Inventario.length + 1;

    req.body.id = novoId;

    Inventario.push(req.body);

    res.status(201).json(req.body);
};

Rota:

app.post("/", novoInventario);
8. Criar o GET por ID — consultar um item

A atividade também pede:

GET /inventario/1

Então precisamos criar uma rota para buscar um único item:

const buscarInventario = (req, res) => {
    const id = req.params.id;

    const item = Inventario.find(item => item.id == id);

    if (!item) {
        return res.status(404).json({
            mensagem: "Item não encontrado!"
        });
    }

    res.json(item);
};

Rota:

app.get("/:id", buscarInventario);
9. Criar PUT e DELETE

PUT — alterar:

app.put("/:id", alterarInventario);

Ele recebe o ID pela URL:

PUT http://localhost:5000/1

e os novos dados pelo Body.

DELETE — excluir:

app.delete("/:id", excluirInventario);

Exemplo:

DELETE http://localhost:5000/1
10. Testar tudo no Thunder Client

No Thunder Client, faça:

Método	URL	Função
GET	localhost:5000	Listar todos
GET	localhost:5000/1	Buscar ID 1
POST	localhost:5000	Criar item
PUT	localhost:5000/1	Alterar ID 1
DELETE	localhost:5000/1	Excluir ID 1

<img width="918" height="694" alt="put_certo" src="https://github.com/user-attachments/assets/132a5435-60ec-4cbf-aae2-29e944b69d29" />
<img width="928" height="696" alt="Captura de tela 2026-09-29 093211" src="https://github.com/user-attachments/assets/83e8322f-a309-431f-a4dd-280c0d0893f5" />
<img width="912" height="636" alt="Captura de tela 2026-09-29 093133" src="https://github.com/user-attachments/assets/50d9e4c1-2eef-45c2-910f-c17c0aa3b6cb" />
<img width="880" height="937" alt="aula7" src="https://github.com/user-attachments/assets/726c129c-bdd1-4078-9f23-07158fc58034" />
