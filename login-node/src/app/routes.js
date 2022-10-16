
module.exports = (app, passport)=> {


app.get('/',(req,res)=>{
    res.render('index'); // vamos a renderizar una vista llamada index.ejs
})
app.get('/login',(req,res)=>{
    res.render('login',{
        message:req.flash('loginMessage')
    }); // vamos a renderizar una vista llamada index.ejs
});
app.post('/login', passport.authenticate('local-login',{
    successRedirect: '/profile',
    failureRedirect: 'login',
    failureFlash: true
    }));
app.get('/signup',(req,res)=>{
    res.render('signup',{
        message:req.flash('signupMessage')
    }); // vamos a renderizar una vista llamada index.ejs
});

app.post('/signup', passport.authenticate('local-signup',{
successRedirect: '/profile',
failureRedirect: 'signup',
failureFlash: true
}));


app.get('/profile',isLoggedIn, (req,res)=>{
res.render('profile', {
user: req.user
});
});
// logout
app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

};

function isLoggedIn(req,res,next){

    if(req.isAuthenticated()){
        return next();
    }
    else{
        return res.redirect('/');
    }
}