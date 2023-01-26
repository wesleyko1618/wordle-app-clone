require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;
const axios = require("axios").default;
const cors = require("cors")

app.use(cors())

app.get('/word', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://wordsapiv1.p.rapidapi.com/words/',
        params: {
          random: 'true',
          letters: '5'
          },
        headers: {
          'X-RapidAPI-Key': process.env.WORDS_API_KEY,
          'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
          res.json(response.data.word)
      }).catch(function (error) {
          console.error(error);
      });
})

app.get('/check', (req, res) => {
    const options = {
        method: 'GET',
        url: `https://wordsapiv1.p.rapidapi.com/words/${req.query.word}`,
        headers: {
            'X-RapidAPI-Key': process.env.WORDS_API_KEY,
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data)
        res.json(response.data.word)
    }).catch(function (error) {
        res.json(error.response.data.success)
        console.error(error.response.data);
    }); 
})

app.listen(PORT, () => console.log('Server is running on port ' + PORT))