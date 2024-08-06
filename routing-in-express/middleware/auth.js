module.exports={
    ensureAuth:(req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        else{
            req.flash('error_msg','you need to be logged in first')
            res.redirect("auth/login");
        }
    }
}