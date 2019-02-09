const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { translate } = require('./controllers/translate');

const usersRouter = require('./routers/users');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extened: true }));

app.use('/users', usersRouter);

app.get('/', (req, res) => res.json('HI'));

app.post('/translate', translate);

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
});
