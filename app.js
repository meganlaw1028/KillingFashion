/* eslint-disable no-const-assign */
const http = require('http');
const express = require('express');

// const routes = require('/routes');
// const user = require('/routes/user');
const fs = require('fs');
const path = require('path');

const favicon = require('serve-favicon');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const errorHandler = require('errorhandler');
const data = fs.readFileSync('client/DataSet/data.json');
const jsonData = JSON.parse(data);
const exphbs = require('express-handlebars');
const app = express();
const index = require('./routes/index.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client', '/index.html'));
  });
app.get('/OrderPage', (req, res) => {
    res.sendFile(path.join(__dirname, '/client', '/OrderPage.html'));
  });
app.use(favicon(path.join(__dirname, '/client/image/shoeicon.ico')));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'uwotm8'
}));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(multer());

app.get('/rating.do', function (request, response) {
    console.log('Review completed.');
    console.log(request.query);
    response.redirect('/index.html');

    const newComment = {
      rating: request.query.rating,
      comments: request.query.comments
    };

    fs.readFile('data01.json', function (err, data) {
      if (err) {
        response.send('<h1>Error reading JSON file.</h1>');
        console.log(err);
        return;
      }

      const comments = JSON.parse(data);
      comments.push(newComment);

      fs.writeFile('data01.json', JSON.stringify(comments), function (err) {
        if (err) {
          response.send('<h1>Error writing to JSON file.</h1>');
          console.log(err);
        } else {
          console.log('New comment added to /data01.json');
        }
      });
    });
  });

app.get('/order.php', function (request, response) {
    console.log('Order completed.');
    console.log(request.query);

    // create an object with the data you want to write to the JSON file
    const data = [{
        clientname: request.query.clientname,
        PWD: request.query.PWD,
        address: request.query.address,
        Cardnumber: request.query.Cardnumber,
        paymethod: request.query.paymethod,
        quantity: request.query.quantity,
        size: request.query.size,
        verification: request.query.verification,
        otherField: request.query.otherField
    }];

    // write the data to a JSON file using the fs module
    fs.writeFile('client/DataSet/data.json', JSON.stringify(data), function (err) {
        if (err) {
            response.send('<h1>Error writing to JSON file.</h1>');
            console.log(err);
        } else {
            if (request.query.verification === 'qGphJD') {
                response.redirect('/ConfirmPage.html');
            } else {
                response.send('<h1>Sorry, your purchase could not be completed as the verification is failed.</h1>');
            }
        }
    });
});
app.get('/done', function (req, res) {
    $(document).ready(function () {
        $('#ShoesList').DataTable({
            ajax: '/DataSet/shoeinfo.json',
            deferRender: true,
            columns: [
                { data: 'brand' },
                { data: 'model' },
                { data: 'designer' },
                { data: 'price' },
                { data: 'releaseDate' }
            ]
        });
    });
    fs.readFile('client/DataSet/data.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server Error');
      }

      const confirm = JSON.parse(data);
      res.send(confirm);
    });
  });

app.post('/subscribe', function (req, res) {
  const lastname = req.body.lastname;
  const email = req.body.email;
  const newsletter = req.body.newsletter;
  console.log(req.body);
  const filePath = path.join(__dirname, 'subscribers.txt');
  const member = `${lastname}, ${email}, ${newsletter ? 'Yes' : 'No'}\n`;
  fs.appendFile(filePath, member, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send('Error writing subscriber data to file');
      return;
    }
    // Display success message on the HTML page
    const message = `<p>Thank you for subscribing! Your last name is ${lastname} and your email is ${email}.`;
    res.send(message);
  });
});

// app.get('/', routes.index);
// app.get('users', user.list);

if (app.get('env') === 'development') {
    app.use(errorHandler());
  }

module.exports = app;
