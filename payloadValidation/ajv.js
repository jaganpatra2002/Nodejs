const Ajv = require('ajv');
const express = require('express');

const ajv = new Ajv();
const app = express();
app.use(express.json());

const schema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    email: { type: 'string', format: 'email' },
  },
  required: ['username', 'email'],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

app.post('/validate', (req, res) => {
  const valid = validate(req.body);
  if (!valid) return res.status(400).json(validate.errors);
  res.send('Validation passed');
});

app.listen(8080);
