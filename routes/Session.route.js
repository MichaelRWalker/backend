const router = require('express').Router();
const {Session} = require('../models/models');
const validation = require('../validation/Session.validation');
const getProject = require('../middlewares/getProject');
const verify = require('../middlewares/verify');

router.get('/:artistId/:projectId',verify,getProject,(req,res)=>{
        res.send(req.project.sessions)
});
router.post('/:artistId/:projectId',verify,getProject,(req,res)=>{
    // validate project
    const {error} = validation(req.body);
    if(error) return res.status(400).send(error);
    // if validated add to project
    const session = new Session(req.body);
    req.project.sessions.push(session);
    // then save
    req.dbUser.save();
    res.send(session)


});
router.put('/:artistId/:projectId/:id',verify,getProject,(req,res)=>{
        const user = req.dbUser;
        const project = req.project;
        // validate project
        const {error} = validation(req.body);
        if(error) return res.status(400).send(error);
        // if it passes validation find session
        const sessionID = req.params.id;
        const session = project.sessions.id(sessionID);
        if(session===null)return res.status(400).send('Session Not Found');
        // then update the session 
        session.set(req.body);
        res.send(`The Session was updated`);
        user.save();
});
router.delete('/:artistId/:projectId/:id',verify,getProject,(req,res)=>{
        const user = req.dbUser;
        const project = req.project;
        const sessionID = req.params.id;
        const session = project.sessions.id(sessionID);
        if(!session)return res.status(400).send('Session Not Found');
        session.remove();
        res.send('Session Deleted');
        user.save();
});

module.exports = router;