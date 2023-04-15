const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/view"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Libros'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  
  console.log('Connected to database with ID ' + connection.threadId);
});

app.get('/', (req, res) => {
    res.sendFile('/view/index.html', { root: __dirname });
});

app.get('/registrar', (req, res) => {
  res.sendFile('/view/form.html', { root: __dirname });
});

app.get('/libros', (req, res) => {
  var param =  req.query.text;
  console.log(param)
  connection.query('SELECT * FROM libros WHERE titulo LIKE "%' + param + '%" OR autor LIKE "%' + param + '%"', (error, results, fields) => {
    if (error) throw error;
    
    res.json(results);
  });
});

app.post('/libros', (req, res) => {
  const { titulo, autor, editorial,fecha } = req.body  
});

// POST endpoint
app.post('/libros', (req, res) => {
  // Add a new book to the database
  const book = { id: 3, titulo: '1984', autor: 'George Orwell' };
  
  // Send the new book as a response
  res.json(book);
});

// PUT endpoint
app.put('/libros/:id', (req, res) => {
  const id = req.params.id;
  // Update the book with the given ID in the database
  const updatedBook = { id: id, titulo: 'Brave New World', autor: 'Aldous Huxley' };
  
  // Send the updated book as a response
  res.json(updatedBook);
});

// DELETE endpoint
app.delete('/libros/:id', (req, res) => {
  const id = req.params.id;
  // Remove the book with the given ID from the database
  
  // Send a success message as a response
  res.send(`Libro con ${id} ha sido borrado`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});