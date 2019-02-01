const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const DownloadImage = async (url, filename) => {
  return new Promise((resolve, reject) => {
    fetch(url + "/" + filename)
    .then(function(response) {
      var destination = fs.createWriteStream(path.join(__dirname, 'images', filename));
      var stream = response.body.pipe(destination);
      stream.on('finish', () =>{
        resolve();
      })
    })
    .catch(err => {
      console.log("Error in ImageService: ", err);
    })
  });
}
module.exports = {
  DownloadImage: DownloadImage
}