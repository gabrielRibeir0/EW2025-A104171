const mongoose = require("mongoose");
const ArqSonSchema = new mongoose.Schema({
    prov: {
        title: String, required:true
    }
})

const ArqSon = mongoose.model("ArqSon", ArqSonSchema);

module.exports = ArqSon;