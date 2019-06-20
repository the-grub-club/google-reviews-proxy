require('newrelic');
const express = require('express');
const path = require('path');
const request = require('request');

const app = express();
const port = 1000;
app.use(express.static(path.join(__dirname, '../public')));

// app.get('/restaurants/:id', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

// app.get('/api/restaurants/:id/photos', (req, res) => {
//   const { id } = req.params;
//   res.redirect(`http://3.88.8.197:3000/api/restaurants/${id}/photos`);
// })

// app.get('/api/restaurants/:id/reviews', (req, res) => {
//   const { id } = req.params;
//   res.redirect(`http://localhost:3001/api/restaurants/${id}/reviews`);
// })

// app.get('/api/restaurants/:id/info', (req, res) => {
//   const { id } = req.params;
//   res.redirect(`http://3.16.165.5:3002/api/restaurants/${id}/info`);
// })

app.get('/restaurants/:id', (req, res) => {
  const { id } = req.params;
  const url = 'http://127.0.0.1:3005/api/restaurants/' + id + '/googlereviews'
  request(url, (err, response) => {
    if (err) {
      console.error(err);
    }
  }).pipe(res);
});

app.listen(port, console.log('proxy server listening on port', port));
