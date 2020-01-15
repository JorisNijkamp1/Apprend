const express = require('express');
const v1 = express.Router();
const path = require('path');
const decksRoute = require('./decks/decks')
const usersRoute = require('./users/users')
const loginRoute = require('./login/login')
const fileUpload = require('express-fileupload');
const crypto = require('crypto')

// Gets an image from the file system root/files/images/:pathParam
v1.get('/images/:pathParam', async (req, res) => {
    res.sendFile(`${req.params.pathParam}`, {root: path.join(__dirname, '../../../public/images')}, err => {
        if (err) return res.status(500).json({message: 'Something went wrong'})

    })
});

v1.get('/audio/:pathParam', async (req, res) => {
    res.sendFile(`${req.params.pathParam}`, {root: path.join(__dirname, '../../../public/audio')})
});

v1.post('/upload/*', fileUpload());

v1.post('/upload/image', async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({message: 'No files were uploaded'});
          }
        const fileName = crypto.randomBytes(20).toString('hex');

        // Check if file is < ~ 10MB
        if (req.files.image.size > 10000000) return res.status(400).json({message: 'File too large'});

          let sampleFile = req.files.image;

          const accepted = ['.jpg', '.jpeg', '.png', '.svg', '.gif'];
          if (!accepted.includes(path.extname(sampleFile.name).toLowerCase())) return res.status(400).json({message: 'Please throw a .mp3 towards us'})

          sampleFile.mv(`./public/images/${fileName + req.files.image.name}`, function(err) {
            if (err){
                console.log(err)
                return res.status(500).json({message:'Something went wrong'});
            }
            res.status(201).json({message: 'File uploaded!', data: fileName + req.files.image.name, success: true})
          })
    } catch(err) {
        console.log(err)
        return res.status(500).json({message: 'We couldn\'t catch your file'})
    }
})

v1.post('/upload/audio', async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({message: 'No files were uploaded'});
          }
        const fileName = crypto.randomBytes(20).toString('hex')

        // Check if file is < ~ 10MB
        if (req.files.audio.size > 10000000) return res.status(400).json({message: 'File too large'})

        let sampleFile = req.files.audio;
        if (path.extname(sampleFile.name).toLowerCase() !== '.mp3') return res.status(400).json({message: 'Please throw a .mp3 towards us'})

        sampleFile.mv(`./public/audio/${fileName + req.files.audio.name}`, function(err) {
        if (err){
            console.log(err)
        return res.status(500).json({message:'Something went wrong'});
        }
        res.status(201).json({message: 'File uploaded!', data: fileName + req.files.audio.name, success: true})
        })
    } catch(err) {
        console.log(err)
        return res.status(500).json({message: 'We couldn\'t catch your file'})
    }
})


v1.use('/decks/', decksRoute)
v1.use('/users/', usersRoute)
v1.use('/login/', loginRoute)

module.exports = v1
