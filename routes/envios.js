const { Router, request } = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const router = Router();

router.get("/", async (req, res) => {
    const uri = "mongodb+srv://Maria:123@envios.vnbfn.mongodb.net/EnviosDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await client.db("EnviosDB").command({ ping: 1 });
        const guias = client.db("EnviosDB").collection("Envios").find();
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
        const query = {"datosEnvio.numGuia": idGuia};
        console.log(query);
        const guias = client.db("EnviosDB").collection("Envios").find(query);
        console.log(guias);
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
            const guiaAdd = client.db("EnviosDB").collection("Envios").insertOne(JSON.parse(guia));
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

router.delete("/:id", async (req, res) => {
    let idGuia = '';
    const uri = "mongodb+srv://Maria:123@envios.vnbfn.mongodb.net/EnviosDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    idGuia = req.params.id;
    try {
        await client.connect();
        const query = { _id: ObjectID(idGuia) };
        const result = await client.db("EnviosDB").collection("Envios").deleteOne(query);
        if (result.deletedCount === 1) {
          console.dir("Successfully deleted one document.");
        } else {
          console.log("No documents matched the query. Deleted 0 documents.");
        }
      } finally {
        await client.close();
      }
});

module.exports = router;
