const router = require('express').Router();
const passport = require('passport');

router.get('/discord', passport.authenticate('discord'));

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    res.redirect('https://jjab6.ml/menu');
    // res.redirect('http://127.0.0.1:3000/menu');
});

router.get('/', (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        console.log(req.user)
        res.status(401).send({msg: 'Unauthorized'});
    }
})  

module.exports = router;