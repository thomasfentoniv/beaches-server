const { PORT = 7070 } = process.env;
const app = require('./app');

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))