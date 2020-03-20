const express = require("express");
const professorController = require('../controllers/professor');
const router = express.Router();
const isAuth = require('../middleware/is-Auth');
const multer  = require("multer");
// использование модуля multer и конфигурирование его загружать все доки в папку /uploads на сервере
const upload = multer({dest:"uploads"});
const isProfessor = require('../middleware/is-Professor');
// рут куда направляются запросы на получение страницы профессора, 
// если пользовател авторизован как профессор, middleware isProfessor из папки middleware/
router.get("/professor", isAuth, isProfessor, professorController.getProfessor);
router.get("/professor/:taskId", isAuth, isProfessor, professorController.getProfessor);
// по этому руту проходят запросы на загрузку опрного дока для проверки moss
router.post("/professor/upload/:taskId", isAuth, isProfessor, upload.single('filedata'), professorController.uploadBaseDoc);
// рут по которому будут проходить запросы на загрузку файла, идентифицированного через параметр [:name]
router.get("/professor/download/uploads/:name", isAuth, isProfessor, professorController.downloadFile);
router.post("/update/documents/details", isAuth, isProfessor, professorController.updateDocumentDetails);
router.post("/add/task", isAuth, isProfessor, upload.single('taskfile'), professorController.addTask);

module.exports = router;