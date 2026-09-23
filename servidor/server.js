const express = require("express");
const Inventario = require("../dados.json");

const mostrarInventario = (req, res) => {
    res.send(Inventario)
    
}



const novoInventario = (req, res) => {
    if(req.body){
        res.send("Item adicionado ao inventário!");
        Inventario.push(req.body);
        if(req.body){
            const novoId = Inventario.length + 1;
            req.body.id = novoId;
            Inventario.push(req.body);
            res.send("Item adicionado ao inventário!");
        }
    }else{

        res.send("Erro ao receber o Inventário!");
  
    }

}

const excluirInventario = (req, res) => {
const id = req.params.id;

Inventario.forEach((item , indice) => {
        if(item.id == id){
            Inventario.splice(indice, 1);
            
        }
 res.send("Item excluído com sucesso!");
 });

};


const alterarInventario = (req, res) => {
  const id = req.params.id;
  const dados = req.body;

  Inventario.forEach((inventario) => {
    if (inventario.id == id) {
      inventario.item = dados.item;
      inventario.local = dados.local;
      inventario.dataRegistro = dados.dataRegistro;
      inventario.valor = dados.valor;
      inventario.patrimonio = dados.patrimonio
    }
  });
    res.send("Item alterado com sucesso!");

};


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const porta = 5000;


app.get("/", mostrarInventario);
app.post("/", novoInventario);
app.delete("/:id", excluirInventario);
app.put("/:id", alterarInventario);


app.listen(porta, () => {
     console.log(`Servidor: http://127.0.0.1:${porta}`);
    });