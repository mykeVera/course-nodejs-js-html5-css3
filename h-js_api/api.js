const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const user = require('./user.controller');

app.use(express.json());
mongoose.connect('mongodb+srv://mikeveraq_db_user:iwMaJ25BwpEe8vYl@cluster0.h0fg1o3.mongodb.net/?appName=Cluster0');

app.get('/', user.list);
app.post('/', user.create);
app.get('/:id', user.get);
app.put('/:id', user.update);
app.patch('/:id', user.update);
app.delete('/:id', user.destroy);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});