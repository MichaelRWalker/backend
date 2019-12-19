const router = require('express').Router();
const {Payment} = require('../models/models');
const getProject = require('../middlewares/getProject');
const validation = require('../validation/Payment.validation');
const verify = require('../middlewares/verify');

router.get('/:artistId/:projectId',verify,getProject,(req,res)=>{
    const project = req.project;
    res.send(project.payments)
});
router.post('/:artistId/:projectId',verify,getProject,(req,res)=>{
    
    const user = req.dbUser;
    const project = req.project;

    const {error} = validation(req.body);
    if(error)return res.status(400).send(error);

    const payment = new Payment(req.body);
    project.payments.push(payment);

    user.save();
    res.send(payment)

});
router.put('/:artistId/:projectId/:id',verify,getProject,(req,res)=>{
    const user = req.dbUser;
    const project = req.project;

    const {error} = validation(req.body);
    if(error)return res.status(400).send(error);
    
    const paymentId = req.params.id
    const payment = project.payments.id(paymentId)

    payment.set(req.body)

    user.save();
    res.send('Payment updated')
});
router.delete('/:artistId/:projectId/:id',verify,getProject,(req,res)=>{
    const user = req.dbUser;
    const project = req.project;
    const sessionID = req.params.id

    project.payments.id(sessionID).remove();

    user.save();
    res.send('Payment deleted')
});

module.exports = router