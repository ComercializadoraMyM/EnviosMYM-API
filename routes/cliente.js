const { Router } = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const router = Router();

router.get("/", async (req, res) => {
    const uri = "mongodb+srv://Maria:123@envios.vnbfn.mongodb.net/EnviosDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        await client.db("EnviosDB").command({ ping: 1 });
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
            const clienteAdd = client.db("EnviosDB").collection("Clientes").insertOne(JSON.parse(cliente));
            console.log('adicion', cliente)
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

router.post("/tarifa/:vlrTarifa/:id", async(req, res) => {  
    let vlrTarifaUp = '';
    let idCliente= '';  
    const uri = "mongodb+srv://Maria:123@envios.vnbfn.mongodb.net/EnviosDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    vlrTarifaUp = req.params.vlrTarifa;
    idCliente = req.params.id;
    if (idCliente) {
        try {
            await client.connect();
            await client.db("EnviosDB").command({ ping: 1 });
            const query = {_id: ObjectID(idCliente)};
            const updateDocument = { $set: { vlrTarifa: vlrTarifaUp } };
            const guiaUpdate = client.db("EnviosDB").collection("Clientes").updateOne(query, updateDocument);
            console.log(guiaUpdate);
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

router.post("/seguro/:vlrSeguro/:id", async(req, res) => {  
    console.log('entraa')
    let vlrSeguroUp = '';
    let idCliente= '';  
    const uri = "mongodb+srv://Maria:123@envios.vnbfn.mongodb.net/EnviosDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    vlrSeguroUp = req.params.vlrSeguro;
    idCliente = req.params.id;
    if (idCliente) {
        try {
            await client.connect();
            await client.db("EnviosDB").command({ ping: 1 });
            const query = {_id: ObjectID(idCliente)};
            const updateDocument = { $set: { vlrSeguro: vlrSeguroUp } };
            const guiaUpdate = client.db("EnviosDB").collection("Clientes").updateOne(query, updateDocument);
            console.log(guiaUpdate);
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
