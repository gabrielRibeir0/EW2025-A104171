const ArqSon = require("../models/arqSon");

// Criar um novo registo
exports.createRecord = async (req, res) => {
    try {
        const newRecord = new ArqSon(req.body);
        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obter todos os registos
exports.getAllRecords = async (req, res) => {
    try {
        const records = await ArqSon.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obter um registo por ID
exports.getRecordById = async (req, res) => {
    try {
        const record = await ArqSon.findById(req.params.id);
        if (!record) res.status(404).json({ message: "Registo não encontrado" });
        else res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar um registo por ID
exports.updateRecord = async (req, res) => {
    try {
        const updatedRecord = await ArqSon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecord) res.status(404).json({ message: "Registo não encontrado" });
        else res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Apagar um registo por ID
exports.deleteRecord = async (req, res) => {
    try {
        const deletedRecord = await ArqSon.findByIdAndDelete(req.params.id);
        if (!deletedRecord) res.status(404).json({ message: "Registo não encontrado" });
        else res.status(200).json({ message: "Registo excluído com sucesso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
