const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = 3000;

let issues = [];
app.use(bodyParser.json());
app.use(cors());

// app.get('/issues/:id', (req, res) => {
//     const { id: id_to_get } = req.params;
//     const issue_to_get = issues.find((issue) => {
//         return issue.id == id_to_get;
//     });

//     res.send({ issue: issue_to_get });
// });

app.get('/issues', (req, res) => {
    res.send({ issues });
});

app.post('/issues', (req, res) => {
    const { id, description, title } = req.body;
    issues.push({ id: Date.now(), description, title });
    res.send(`Successfully created ${id} with title ${title}`);
});

app.delete('/issues/:id', (req, res) => {
    const { id } = req.params;
    console.log(`🚀 ------------------------🚀`);
    console.log(`🚀 ~ app.delete ~ id:`, id);

    if (issues.length === 0) res.send('DONT EXIST');
    issues = issues.filter((issue) => {
        return issue.id != id;
    });
    console.log(`🚀 ------------------------------------------🚀`);
    console.log(`🚀 ~ issues=issues.filter ~ issues:`, issues);
    console.log(`🚀 ------------------------------------------🚀`);

    res.send('DELETED');

    // issues = issues.filter((issue) => issue.id != issue_to_get.id);
});

app.put('/issues', (req, res) => {
    const { id, title, description } = req.body;

    const issue_to_get = issues.find((issue) => issue.id == id);
    if (!issue_to_get) res.send('DONT EXIST');

    issues = issues.filter((issue) => issue.id != id);
    issues.unshift({ ...issue_to_get, title, description });
    res.send(`Successfully updated ${id}`);
});

app.listen(PORT, () => {
    console.log('listening to PORT ', PORT);
});
