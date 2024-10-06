const userModel=require("../models/user_model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {generate_token}=require("../utils/generate_token")
module.exports.resgisterUser= async function(req,res){
    try{
        let {email,password, fullname} =req.body;
        let user=await userModel.findOne({email:email});
        if(user) return res.status(401).send("User already exist")

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt,async function(err, hash) {
            if(err) return res.send(err.message);
            else {
                let user=await userModel.create({
                    email,
                    password:hash,
                    fullname
                });
                let token=generate_token(user);
                res.cookie("token",token);
                let success=req.flash("success")
                return res.render("index", { success });
            }
        });
    });
    } catch(err){
        res.status(500).send(err.message);
    }
};
module.exports.loginUser= async function(req,res){
    let {email,password} =req.body;
    let user= await userModel.findOne({email:email});
    if(!user) return res.send("Email or Password incorrect")
    bcrypt.compare(password,user.password,function(err,result){
    if(result){
        let token=generate_token(user);
        res.cookie("token",token);
        res.redirect("/shop");
    }
    else{
        res.send("Email or Password incorrect")
    }
})
}
module.exports.logoutUser=function(req,res){
    res.cookie("token","");
    res.redirect("/")
}

