const router = require('express').Router()
const userCtr = require("../controllers/user.controller")
const {auth , auth1} = require('../middleware/auth')
router.post("/",userCtr.signUp)
router.post("/login",userCtr.login)
router.get("/",auth,userCtr.getAll)

module.exports = router