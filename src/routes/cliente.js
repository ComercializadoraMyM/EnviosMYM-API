const { Router } = require("express");
const { MongoClient } = require("mongodb");
const router = Router();

router.get("/", async (req, res) => {
    const uri = "mongodb+srv://Maria:123@envios.vnbfn.mongodb.net/EnviosDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await client.db("EnviosDB").command({ ping: 1 });
        //const projection = { _id:0, nombre: 1 };
        const clientes = client.db("EnviosDB").collection("Clientes").find();
        var respuesta = [];
        await clientes.forEach(function(cliente){
            respuesta.push(cliente);
        });
        res.send(respuesta);
    } catch (error){
        console.log(error);
    } 
    finally {
        await client.close();
    } 
});

router.post("/", async(req, res) => {    
    const uri = "mongodb+srv://Maria:123@envios.vnbfn.mongodb.net/EnviosDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    const { cliente } = req.body;

    if (cliente) {
        try {
            await client.connect();
            await client.db("EnviosDB").command({ ping: 1 });
            console.log(cliente);
            console.log(JSON.parse(cliente));
            const clienteAdd = client.db("EnviosDB").collection("Guias").insertOne(cliente);
            res.send("saved");
        } catch (error){
            console.log(error);
        } 
        finally {
            await client.close();
        } 
    } else {
        res.send("wrong request");
    }
});

module.exports = router;
