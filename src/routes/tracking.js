const { Router } = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const router = Router();

router.get("/", async (req, res) => {
    const uri = "mongodb+srv://Maria:123@envios.vnbfn.mongodb.net/EnviosDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await client.db("EnviosDB").command({ ping: 1 });
        const trackings = client.db("EnviosDB").collection("Tracking").find();
        var respuesta = [];
        await trackings.forEach(function(tracking){
            respuesta.push(tracking);
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
    const { tracking } = req.body;

    if (tracking) {
        try {
            await client.connect();
            await client.db("EnviosDB").command({ ping: 1 });
            const trackAdd = client.db("EnviosDB").collection("Tracking").insertOne(JSON.parse(tracking));
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



router.post("/:whr/:id", async(req, res) => {  
    let whrUp = '';
    let idTrack= '';  
    const uri = "mongodb+srv://Maria:123@envios.vnbfn.mongodb.net/EnviosDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    const { tracking } = req.body;
    whrUp = req.params.whr;
    idTrack = req.params.id;
    console.log(whrUp+' '+idTrack);

    if (idTrack) {
        try {
            await client.connect();
            await client.db("EnviosDB").command({ ping: 1 });
            const query = {_id: ObjectID(idTrack)};
            const updateDocument = { $set: { whr: whrUp } };
            const guiaUpdate = client.db("EnviosDB").collection("Tracking").updateOne(query, updateDocument);
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
