const express = require('express');
const app = express();
const port = 5000
const cors = require('cors');

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result = users['users_list'];
    if (name != undefined)
        result = findUserByName(name, result);
    if (job != undefined)
        result = findUserByJob(job, result);
    result = {users_list: result};
    res.send(result);
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});


app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

function addUser(user) {
    users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else
    {
        users['users_list'] = users['users_list'].filter( (user) => user['id'] != id);
        res.status(200).end();
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const findUserByName = (name, list) => {
    return list.filter( (user) => user['name'] === name);
}

const findUserByJob = (job, list) => {
    return list.filter( (user) => user['job'] === job);
}

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id);
}