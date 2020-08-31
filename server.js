const express = require('express');
const app = express();
app.use(express.static(__dirname + '/dist/math-tools'));

app.get('/*', (req, resp) => {
  resp.sendFile(__dirname + '/dist/math-tools/index.html');
});

const port = process.env.PORT || 4200;
console.log(`Listening on port ${port}`);
app.listen(port);

