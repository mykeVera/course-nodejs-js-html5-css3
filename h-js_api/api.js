const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const user = require('./user.controller');

app.use(express.json());
mongoose.connect('mongodb+srv://mikeveraq_db_user:iwMaJ25BwpEe8vYl@cluster0.h0fg1o3.mongodb.net/?appName=Cluster0');

app.get('/users', user.list);
app.post('/users', user.create);
app.get('/users/:id', user.get);
app.put('/users/:id', user.update);
app.patch('/users/:id', user.update);
app.delete('/users/:id', user.destroy);

app.use(express.static('app'));


app.get('/', (req, res) => {
  console.log(__dirname);
  res.sendFile(`${__dirname}/index.html`);
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});