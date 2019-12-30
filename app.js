const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req,res) => {
    res.send('Bye bye Express!');
});

app.get('/burgers', (req,res) => {
    res.send('We have juicy cheese burgers!');
});

app.get('/pizza/pepperoni', (req,res) => {
    res.send('Your pizza is on the way!');
});

app.get('/pizza/pineapple', (req,res) => {
    res.send('We don\'t serve that here. Never call again!');
});

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
        Base URL: ${req.baseUrl}
        Host: ${req.hostname}
        IP: ${req.ip}
        Route: ${req.route}
        Query: ${req.query}
    `;
    res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end();
});

app.get('/greetings', (req, res) => {
    const name = req.query.name;
    const race = req.query.race;

    if(!name) {
        return res.status(402).send('Please provide a name');
    }

    if(!race) {
        return res.status(400).send('Please provide a race');
    }

    const greetings = `Greetings ${name} the ${race}, welcome to our kingdom!`;

    res.send(greetings);
})

app.get('/sum', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);


    if(!a) {
        return res.status(400).send('Please provide number a');
    }

    if(!b) {
        return res.status(400).send('Please provide number b');
    }

    function sum(a, b) {
        return a + b;
    }

    const answer = `The sum of ${a} and ${b} is ${sum(a,b)}.`

    res.send(answer);
});

app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = parseFloat(req.query.shift);


    if(!text) {
        return res.status(400).send('Please provide text');
    }

    if(!shift) {
        return res.status(400).send('Please provide shift');
    }

    let chars = text.split('');
    let utfStringArray = chars.map((char) => char.charCodeAt(0))
    let codedStringArray = utfStringArray.map(charCode => String.fromCharCode(charCode+shift));
    let cipher = codedStringArray.join('');

    res.send(cipher);
});

app.get('/lotto', (req, res) => {
    const numberString = req.query.numbers;

    if(!numberString) {
        return res.status(400).send('Please provide at least 6 numbers');
    }

    const numberCorrect = numberString.map(number => parseFloat(number));

    if(numberCorrect.length < 6) {
        return res.status(400).send('You must input at least 6 numbers');
    }

    for(let i = 0; i <= numberCorrect.length; i++){
        let numberCheck = numberCorrect[i];
        if(numberCheck > 20 || numberCheck < 1 || isNaN(numberCheck)){
            return res.status(400).send('Numbers must be between 1 and 20');
        }
    }

    const lottoNumbers = Array(6).fill().map(() => Math.ceil(Math.random() * 20));

    function compareLotto(array1, array2) {
        let counter = 0;

        for (let i=0; i <= array1.length; i++){
            if(array1[i] === array2[i]){
                counter += 1;
            }
        }

        return counter -1 ;
    }

    const guesses = compareLotto(numberCorrect, lottoNumbers);

    if(guesses < 4) {
        res.send('Sorry, you lose');
    }else if(guesses===4){
        res.send('Congratulations, you win a free ticket!')
    }else if(guesses===5){
        res.send('Congratulations! You win $100!')
    }else if(guesses===6){
        res.send('Wow! Unbelievable! You could have won the mega millions!')
    }
});

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});