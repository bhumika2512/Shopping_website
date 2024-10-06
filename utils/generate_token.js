const jwt=require("jsonwebtoken");
const generate_token=(user)=>{
    return jwt.sign({ email:user.email,id:user._id}, process.env.JWT_KEY);
};

module.exports.generate_token=generate_token;