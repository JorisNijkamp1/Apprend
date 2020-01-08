import {API_URL} from '../../../../redux/urls';
import image from './img_avatar.png'
const fs = require('fs')

xdescribe('Upload an image', () => {

    const user = 'Joris'
    const password = 'han'

    let login = {
        username: user,
        password: password
    }
    let deck

    beforeAll( async () => {
        const response = await fetch('http://localhost:3001/api/v1/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(login),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const getAllDecks = await fetch(`http://localhost:3001/api/v1/users/${user}/decks`)
        const data = await getAllDecks.json()
        deck = data.data.decks[0]
    })

    xtest('Edit the value of a column', async () => {
        let file = new FormData()
        let x 
        await fs.readFile(`${__dirname}/img_avatar.png`, async (err, data) => {
            x = data
            let i = await new File(data.buffer, 'avatar.png', {type: 'image/png'})
            file.append('image', i)

        })
        console.log(file)
        // console.log(i)
        // file.append('image', i)
        const response = await fetch(`${API_URL}/upload/image`, {
            method: 'POST',
            credentials: 'include',
            body: file
        })
        const data = await response.json()
        console.log(data.message)
    })
})