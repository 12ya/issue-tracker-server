const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

let issues = [];

app.listen(PORT, () => {
    console.log('listening to PORT ', PORT);
});

app.use(bodyParser.json());

app.get('/issues/:id', (req, res) => {
    const { id: id_to_get } = req.params;
    console.log(`🚀 ---------------------🚀`);
    console.log(`🚀 ~ app.get ~ id:`, id_to_get);
    const issue_to_get = issues.find((issue) => {
        console.log(`🚀 -------------------------------------------------🚀`);
        console.log(`🚀 ~ constissue_to_get=issues.find ~ issue:`, issue);
        console.log(`🚀 -------------------------------------------------🚀`);
        return issue.id == id_to_get;
    });

    // if (!issue_to_get) res.send('DONT EXIST');
    res.send({ issue: issue_to_get });
});

app.get('/issues', (req, res) => {
    res.send({ issues });
});

app.post('/issues', (req, res) => {
    const { id, description, title } = req.body;
    issues.push({ id: Date.now(), description, title });
    res.send(`Successfully created ${id} with title ${title}`);
});

app.delete('/issues', (req, res) => {
    const { id } = req.body;
    const issue_to_get = issues.find((issue) => issue.id == id);
    if (!issue_to_get) res.send('DONT EXIST');

    issues = issues.filter((issue) => issue.id != id);

    res.send(`Successfully deleted ${id} with title ${issue_to_get.title}`);
    res.send({ issues });
});

app.put('/issues', (req, res) => {
    const { id, title, description } = req.body;

    const issue_to_get = issues.find((issue) => issue.id == id);
    if (!issue_to_get) res.send('DONT EXIST');

    issues = issues.filter((issue) => issue.id != id);
    issues.push({ ...issue_to_get, title, description });
    res.send(`Successfully updated ${id} with title ${issue_to_get.title}`);
});
