const { Router } = require("express");
const { MongoClient } = require("mongodb");
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

module.exports = router;
