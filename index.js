const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

let issues = [];

app.listen(PORT, () => {
    console.log('listening to PORT ', PORT);
});

app.use(bodyParser.json());

app.get('/issue/:id', (req, res) => {
    const { id: id_to_get } = req.params;
    console.log(`🚀 ---------------------🚀`);
    console.log(`🚀 ~ app.get ~ id:`, id_to_get);
    const issue_to_get = issues.find((issue) => issue.id === id_to_get);

    if (!issue_to_get) res.send('DONT EXIST');
    res.send({ id: id_to_get });
});

app.post('/issue', (req, res) => {
    const { id, description, title } = req.body;
    issues.push({ id, description, title });
});
