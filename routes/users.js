const { Router } = require("express");
const { MongoClient } = require("mongodb");
const router = Router();

router.get("/:nombre/:contrasena", async (req, res) => {
    let nomb = '';
    let contra = '';
    const uri = "mongodb+srv://Maria:123@envios.vnbfn.mongodb.net/EnviosDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    nomb = req.params.nombre;
    contra = req.params.contrasena;
    try {
        await client.connect();
        await client.db("EnviosDB").command({ ping: 1 });
        const query = {usuario: nomb, contrasena: contra};
        const guias = client.db("EnviosDB").collection("Usuarios").find(query);
        var respuesta = [];
        await guias.forEach(function(cliente){
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

module.exports = router;
