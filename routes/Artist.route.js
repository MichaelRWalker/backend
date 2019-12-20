const router = require('express').Router();
const {User, Artist} = require('../models/models')
const validate = require('../validation/Artist.validation');
const verify = require('../middlewares/verify');

router.get('/', verify, async (req, res) => {
    try{
    const user = await User.findById(req.user._id)
    res.send(user.artists)
    }
    catch(error){res.status(400).send(error)}
});

router.post('/', verify, async (req, res) => {
    try{
    const {name,genre,email} = req.body 
    const notes = req.body.notes || '';
    const members = req.body.members || [];
    const totalOwed = req.body.totalOwed || 0
    // find user to append band to
    console.log('Checking for user')
    const user = await User.findById(req.user._id)
    if (!user) return res.status(400).send('User Not Found');
    console.log('user found');
    console.log(user);
    // check to see if band already exists
    const bandExists = user.artists.some(artist => artist.name === req.body.name)
    if (bandExists) return res.status(400).send('That band already exists' + user)
    console.log('artist is unique adding!')
    // check to see if it fits schema
    const artist = {...{name,genre,email},...{notes,members,totalOwed}};
    console.log(artist)
    const {error} = validate(artist);
    if(error)return res.status(400).send(error);
    console.log('made it past validation')
    // save to DataBase 
    const dbArtist = new Artist(artist)
    console.log('made new artist')
    user.artists.push(dbArtist)
    user.save()
    console.log('saved artist')
    res.send(dbArtist);
    }
    catch(err){res.status(400).send(err)}
});

router.put('/:id', verify, async (req, res) => {
    const artistId = req.params.id;
    // find user 
    const user = await User.findById(req.user._id)
    if(!user)return res.status(400).send('User Not Found')
    // try to find the artist to be updated
    const artist = user.artists.id(artistId)
    if(!artist) return res.status(400).send('Artist Not Found')
    // make sure the update is valid
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // save the updated artist
    artist.set(req.body)
    res.send('Artist has been updated')
    user.save();
});

router.delete('/:id', verify, async (req, res) => {
    const artistId = req.params.id
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send('User Not Found');
    const artist = user.artists.id(artistId)
    if(!artist) return res.status(400).send('Artist Not Found')
    artist.remove()
    user.save();
    res.send('Artist Removed')

});



module.exports = router