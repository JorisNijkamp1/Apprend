const express = require('express');
const v1 = express.Router();
const path = require('path');
const session = require('express-session');
const decksRoute = require('./decks/decks')
const usersRoute = require('./users/users')
const loginRoute = require('./login/login')
const upload = require('../../../middleware/uploadMiddleware')
const Resize = require('../../../Resize')

v1.get('/', (req, res) => {
    res.json(
        'api/v1...'
    )
});

// Gets an image from the file system root/files/images/:pathParam
v1.get('/images/:pathParam', async (req, res) => {
    res.sendFile(`${req.params.pathParam}`, {root: path.join(__dirname, '../../../public/images')})
})

v1.post('/upload', upload.single('image'), async (req, res) => {
    const imagePath = path.join(__dirname, '../../../public/images');
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
      return res.status(400).json({message: 'Please provide an image'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    return res.status(200).json({ message: 'Image uploaded' ,data: filename, success: true });
})

v1.use('/decks/', decksRoute)
v1.use('/users/', usersRoute)
v1.use('/login/', loginRoute)

module.exports = v1
