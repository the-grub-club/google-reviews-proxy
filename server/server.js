//require('newrelic');
const express = require('express');
const path = require('path');
const request = require('request');

const app = express();
const port = 1000;
app.use(express.static(path.join(__dirname, '../public')));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
 });

app.get('/api/restaurants/:id/googlereviews', (req, res) => {
  const { id } = req.params;
  const url = 'http://52.53.187.181:3005/api/restaurants/' + id + '/googlereviews';
  request(url, (err, response) => {
    if (err) {
      console.error(err);
    }
  }).pipe(res);
});

app.listen(port, console.log('proxy server listening on port', port));
