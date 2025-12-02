const express = require('express');
const app = express();
const port = 3000;

const user = require('./user.controller');

app.get('/', user.list);
app.post('/', user.create);
app.get('/:id', user.get);
app.put('/:id', user.update);
app.patch('/:id', user.update);
app.delete('/:id', user.destroy);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});