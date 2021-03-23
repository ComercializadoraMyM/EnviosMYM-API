const { Router } = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const router = Router();

router.get("/", async (req, res) => {
    const uri = "mongodb+srv://Maria:123@envios.vnbfn.mongodb.net/EnviosDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await client.db("EnviosDB").command({ ping: 1 });
        const guias = client.db("EnviosDB").collection("Guias").find();
        var respuesta = [];
        await guias.forEach(function(guia){
            respuesta.push(guia);
        });
        res.send(respuesta);
    } catch (error){
        console.log(error);
    } 
    finally {
        await client.close();
    } 
});

router.get("/:id", async (req, res) => {
    let idGuia = '';
    const uri = "mongodb+srv://Maria:123@envios.vnbfn.mongodb.net/EnviosDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    idGuia = req.params.id;
    try {
        await client.connect();
        await client.db("EnviosDB").command({ ping: 1 });
        const query = {_id: ObjectID(idGuia)};
        const guias = client.db("EnviosDB").collection("Guias").find(query);
        var respuesta = [];
        await guias.forEach(function(guia){
            respuesta.push(guia);
            
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
    const { guia } = req.body;

    if (guia) {
        try {
            await client.connect();
            await client.db("EnviosDB").command({ ping: 1 });
            const guiaAdd = client.db("EnviosDB").collection("Guias").insertOne(JSON.parse(guia));
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



router.post("/:estado/:id", async(req, res) => {  
    let statusUp= '';  
    let idGuia = '';
    const uri = "mongodb+srv://Maria:123@envios.vnbfn.mongodb.net/EnviosDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    statusUp = req.params.estado;
    idGuia = req.params.id;
    console.log(statusUp+' '+idGuia);
    if (idGuia) {
        try {
            await client.connect();
            await client.db("EnviosDB").command({ ping: 1 });
            const query = {_id: ObjectID(idGuia)};
            const updateDocument = { $set: { status: statusUp } };
            const guiaUpdate = client.db("EnviosDB").collection("Guias").updateOne(query, updateDocument);
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