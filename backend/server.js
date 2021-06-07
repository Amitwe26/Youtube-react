const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const favoritesService = require('./services/favoritesService')

const app = express()
const port = 3030

app.use(bodyParser.json());
app.use(express.static('public'))
app.use(cors())


app.get('/favorites', (req, res) => {
    console.log('im heres');
    favoritesService.query()
        .then(favorites => {
            res.send(favorites)
        })
        .catch(err => {
            console.log('err cnot  is:', err);
        })
})

app.post('/favorites', (req, res) => {
    const videoToSave = req.body
    favoritesService.saveVideo(videoToSave)
        .then((savedVideo) => {
            res.send(savedVideo)
        })
        .catch(err => {
            console.log('err  is:', err);
        })
})

app.put('/favorites', (req, res) => {
    const favoritesList = req.body
    favoritesService.updateFavorites(favoritesList)
        .then((updateList) => {
            res.send(updateList)
        })
        .catch(err => {
            console.log('err to update is:', err);
        })
})

app.delete('/favorites/:videoId', (req, res) => {
    const { videoId } = req.params
    console.log('videoId is:', videoId);
    favoritesService.deleteVideo(videoId)
        .then(() => {
            res.send('remove video')
        })
        .catch((err => {
            console.log('err is:', err);
        }))

})

// STARTING THE SEVER.A MUST HAVE LINE IN EVERY CODE
app.listen(port, () => {
    console.log(`Im here Im here!! stop nagging.. http://localhost:${port}`)
})