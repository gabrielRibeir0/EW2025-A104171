const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const arqSonRoutes = require("music_router");

const app = express();
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect("mongodb://localhost:27017/music", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB conectado"))
.catch(err => console.error(err));

// Usar as rotas
app.use("/api/arquivos", arqSonRoutes);

// Iniciar o servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
