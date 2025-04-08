const express = require("express");
const router = express.Router();
const arqSonController = require("../controllers/arqSonController");

// Rotas CRUD
router.post("/", arqSonController.createRecord); // Criar um novo registro
router.get("/", arqSonController.getAllRecords); // Obter todos os registros
router.get("/:id", arqSonController.getRecordById); // Obter um registro por ID
router.put("/:id", arqSonController.updateRecord); // Atualizar um registro por ID
router.delete("/:id", arqSonController.deleteRecord); // Deletar um registro por ID

module.exports = router;
