const express = require('express')
const router = express.Router()
const ContactController = require('../controller/contact.controller')
const {verifyToken}= require('../middleware/auth')


router.get('/contact',verifyToken,ContactController.getallContacts)
router.post('/contact',verifyToken,ContactController.addnewContact)


module.exports = router