const {User} = require('../models/models');

module.exports = async(req,res,next)=>{
        // find user
        const userID = req.user._id
        const user = await User.findById(userID);
        if(user===null)return res.status(400).send('User Not Found')
        // find artist
        const artistID = req.params.artistId;
        const artist = user.artists.id(artistID);
        if(artist===null)return res.status(400).send('Artist Not Found')
        // find project
        const projectID = req.params.projectId;
        const project = artist.projects.id(projectID);
        if(project===null)return res.status(400).send('Project Not Found')
        req.project = project
        req.dbUser = user;
        next();
}