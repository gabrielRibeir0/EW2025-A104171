const mongoose = require("mongoose");

const ArqSonSchema = new mongoose.Schema({
    prov: { type: String, required: true }, // Província
    local: { type: String, required: true }, // Localidade
    tit: { type: String, required: true }, // Título
    musico: { type: String }, // Músico(s) (pode ser nulo)
    inst: { type: String }, // Instrumento(s) (se não houver músico)
    obs: { type: mongoose.Schema.Types.Mixed }, // Observações (pode ser string ou objeto)
    file: {
        "-t": { type: String, required: true }, // Tipo do ficheiro (ex: MP3)
        "#text": { type: String, required: true } // Caminho do ficheiro
    },
    duracao: { type: String } // Duração (formato: "mm:ss")
});

const ArqSon = mongoose.model("ArqSon", ArqSonSchema);

module.exports = ArqSon;
