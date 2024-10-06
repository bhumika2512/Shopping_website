const express=require("express");
const router= express.Router();
const{resgisterUser, loginUser,logoutUser}=require("../controllers/authController")
router.get("/",function(req,res){
    res.send("hey it working");
})
router.post("/register",resgisterUser)

router.post("/login", loginUser)

router.get("/logout", logoutUser)

module.exports=router;