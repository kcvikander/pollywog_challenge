const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const fs = require('fs');
const cache = require('memory-cache');
const ImageService = require('./server/ImageService');
app.use(bodyParser.json());
// Serve Client app
app.use(express.static(path.join(__dirname, 'client', 'build')));
// Make temp directory if it doesn't exist
try {
  fs.mkdirSync(path.join(__dirname, 'server', 'images'));
} catch (err) {
  if (err.code !== 'EEXIST') throw err
}
// Set up base route for client app
app.get('/', function (req, res) {
  console.log(req);
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
// Set up route for serving images
app.get('/img/:id', async (req, res) => {
  const filename = req.params.id  ;
  // If file exists, serve it
  if (fs.existsSync(path.join(__dirname, 'images', filename))){
    res.sendFile(path.join(__dirname, 'images', filename));
  } else { 
  // Else, fetch it, then serve it
    await ImageService.DownloadImage('https://1.api.artsmia.org', filename);
    res.sendFile(path.join(__dirname, 'server', 'images', filename));
  }
});
// Set up route for fetching likes
app.get('/likes', function(req, res) {
  res.end(cache.get('likes'));
})
// Set up route for saving likes
app.post('/likes', function(req, res) {
  const likeId = req.body.id;
  let likes = JSON.parse(cache.get("likes"));
  if (likes){
    if (likes.indexOf(likeId) > -1){
      likes.splice(likes.indexOf(likeId), 1);
    } else {
      likes.push(likeId);
    }
  } else {
    // First time saving, make new array
    likes = [];
    likes.push(likeId);
  }
  cache.put("likes", JSON.stringify(likes));
  res.status(200).send('Like toggled successfully');
})

app.listen(process.env.PORT || 8888);
app.use('/static', express.static('images'))
console.log("Node Application Running on port: ", process.env.PORT || 8888);