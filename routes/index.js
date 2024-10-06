const express=require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const product_model = require("../models/product_model");
const user_model = require("../models/user_model");
const router= express.Router();

router.get("/",function(req,res){
    let error=req.flash("error");
    res.render("index",{error,loggedin:false});
})
router.get("/shop",isLoggedIn,async function(req,res){
    let products= await product_model.find();
    let success=req.flash("success")
    res.render("shop",{products,success});
})
router.get("/cart",isLoggedIn,async function(req,res){
    let user= await user_model.findOne({email: req.user.email}).populate("cart")
    const bill= Number(user.cart[0].price + 20)-Number(user.cart[0].discount)
    res.render("cart",{user,bill});
})
router.get("/addtocart/:productid",isLoggedIn,async function(req,res){
    let user=await user_model.findOne({email: req.user.email})
    user.cart.push(req.params.productid)
    await user.save();
    req.flash("success","Added to cart")
    res.redirect("/shop")
})
router.get("/shopi",isLoggedIn,async function(req,res){
    console.log("hi")
    res.redirect("/shop")
})

module.exports=router;