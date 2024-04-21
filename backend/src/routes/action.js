const express = require('express');
const router = express.Router();
const actionController = require('../app/controllers/ActionController')
const {RequestUpdateDashboard, RequestMessageDto, RequestUpload} = require("../app/validator/dto/Validator");
const {handleValidationErrors} = require("../app/validator/handleValidationErrors");
const {uploadFile} = require('../config/upload')

router.post('/edit', RequestUpdateDashboard, handleValidationErrors, actionController.add);
router.post('/chat', RequestMessageDto, handleValidationErrors, actionController.chatMessage);
router.post('/upload', uploadFile.single('file'), RequestUpload, handleValidationErrors, actionController.uploadFile);
router.post('/download', actionController.downloadFile);
router.get('/user/all', actionController.getAllUser)
module.exports = router;