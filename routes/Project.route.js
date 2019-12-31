const router = require('express').Router();
const {User ,Project} = require('../models/models');
const verify = require('../middlewares/verify');
const validation = require('../validation/Project.validation');

let user;

router.get('/:artistId',verify,async(req,res)=>{
    // find user 
     user = await User.findById(req.user._id);
    // find artist
    const artist = user.artists.id(req.params.artistId);
    // send back sessions
    res.send(artist.projects);

});
router.post('/:artistId',verify,async(req,res)=>{
        // find user 
         user = await User.findById(req.user._id);
        if(!user)return res.status(400).send('User not found');
        // find artist
        const artist = user.artists.id(req.params.artistId);
        if(!artist)return res.status(400).send('Artist not found');
        // validate project
        const {error} = validation(req.body);
        if(error)return res.status(400).send(error);
        // verify project is unique
        const unique = artist.projects.some(project=>project.projectName===req.body.projectName);
        if(unique)return res.status(400).send('That session already exists');
        // this makes sure all forms have at least a default value  
        const templateProject = {...{startDate:new Date(),finishDate:new Date()},...req.body};
        //create a new project
        const project = new Project(templateProject);
        artist.projects.push(project);
        user.save();
        res.send(project);
});
router.put('/:artistId/:id',verify,async(req,res)=>{

    const userId = req.user._id;
    user = await User.findById(userId);
    if(!user) return res.status(400).send('User not found');

    const artistId = req.params.artistId;
    const artist = user.artists.id(artistId);
    if(!artist)return res.status(400).send('Artist not found');

    const projectId = req.params.id;
    const project = artist.projects.id(projectId);
    if(!project) return res.status(400).send('Project not found');
     
    const {tracks,deposit,projectName,startDate,finishDate} = project;
    const dataForDB = {tracks,deposit,projectName,startDate,finishDate}; 
    
    const {error} = validation(dataForDB);
    if(error)return console.log(error) && res.status(400).send(error.details[0].message);

    project.set(dataForDB);
    user.save();
    res.send('Project was updated')

});
router.delete('/:artistId/:id',verify,async(req,res)=>{
    const userId = req.user._id;
    user = await User.findById(userId);
    if(!user) return res.status(400).send('User not found');

    const artistId = req.params.artistId;
    const artist = user.artists.id(artistId);
    if(!artist)return res.status(400).send('Artist not found');

    const projectId = req.params.id;
    const project = artist.projects.id(projectId);
    if(!project) return res.status(400).send('Project not found');

    project.remove();
    user.save();
    res.send('Project was removed')
});

module.exports = router;