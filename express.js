// imports
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// constants
const app = express();
const port = 8080;
const ERR_MSG = "Error: No joke found. Please try again.";

// setting up the ejs and url
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));

// get the home page set up
app.get('/', (req, res) => 
{
    // set the joke and error to null
    var joke = null;
    var error = null;
    var name = null;

    // make sure joke and error are called
    res.render('index.ejs', { joke, error, name });
});

// get the joke
app.post('/jokes', (req, res) => 
{
    // access the users name
    const name = req.body.name;

    // set the joke and error to null
    var joke = null;
    var error = null;

    // call JokeAPI using axios
    axios.get('https://v2.jokeapi.dev/joke/Any', 
    {
        // only get single line jokes
        params: 
        {
            type: 'single'
        }
    })

    // get the joke itself from the api
    .then(joke_given => 
    {
        // extract the joke
        joke = joke_given.data.joke;

        // send the joke to the homepage
        res.render('index.ejs', { joke, error, name });
    })
    .catch(err => 
    {
        // print error if no joke was found
        error = ERR_MSG;
        res.render('index.ejs', { joke, error, name });
    });
});

// start server
app.listen(port, () => 
{
    console.log(`Server is running on port ${port}.`);
});

