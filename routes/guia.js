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
        const query = {codBar: idGuia};
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

router.post("/whr/:whr/:id", async(req, res) => {  
    let whrUp= '';  
    let idGuia = '';
    const uri = "mongodb+srv://Maria:123@envios.vnbfn.mongodb.net/EnviosDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    whrUp = req.params.whr;
    idGuia = req.params.id;
    console.log(whrUp+' '+idGuia);
    if (idGuia) {
        try {
            await client.connect();
            await client.db("EnviosDB").command({ ping: 1 });
            const query = {_id: ObjectID(idGuia)};
            const updateDocument = { $set: { whr: whrUp } };
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

router.delete("/:id", async (req, res) => {
    let idGuia = '';
    const uri = "mongodb+srv://Maria:123@envios.vnbfn.mongodb.net/EnviosDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    idGuia = req.params.id;
    try {
        await client.connect();
        const query = { _id: ObjectID(idGuia) };
        const result = await client.db("EnviosDB").collection("Guias").deleteOne(query);
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
