import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';


const app = express();
const port = 5000;
const url = 'https://secrets-api.appbrewery.com';

const userName = '*********';
const passWord = '*******';
const apiKey = '*********';
const myBearerToken = '*******';

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.render('index.ejs', {content: 'API Response'})
})

app.get('/noAuth', async(req, res) =>{
    try {
        const result = await axios.get(url +'/random');
        res.render('index.ejs', { content: JSON.stringify(result.data)});
    } catch (error) {
        res.status(404).send('Error', error.message);
    }
})

app.get('/basicAuth', async(req, res) =>{
    try {
        const result = await axios.get(url +'/all?page=1', {
            auth : {
                username: userName,
                password: passWord,
            },
        });
        res.render('index.ejs', {content: JSON.stringify(result.data)});
    } catch (error) {
        res.status(404).send('Error', error.message);
    }
})

app.get('/apiKey', async(req, res) =>{
    try {
        const result = await axios.get(url +'/filter', {
            params: {
                score: 5,
                apiKey: apiKey,
            },
        });
        res.render('index.ejs', {content: JSON.stringify(result.data)});
    } catch (error) {
        res.status(404).send("Error", error.message);
    }
})

const config = {
    headers: { Authorization: `Bearer ${myBearerToken}`},
};

app.get('/bearerToken', async (req, res) =>{
    try {
        const resutl = await axios.get(url +'/secrets/4', config);
        res.render('index.ejs', {content: JSON.stringify(resutl.data)});
    } catch (error) {
        res.status(404).send('Error', error.message);
    }
});




app.listen(port, () =>{
    console.log(`This server is running on port ${port}`)
})