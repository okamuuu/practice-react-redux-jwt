const SECRET_KEY = 'SECRET_KEY';

const logger          = require('morgan'),
//      _               = require('lodash'),
//      cors            = require('cors'),
      http            = require('http'),
      express         = require('express'),
      errorhandler    = require('errorhandler'),
      bodyParser      = require('body-parser'),
      jwt             = require('jsonwebtoken'),
      jwtCheck = require('express-jwt')({secret: SECRET_KEY});

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler())
}

app.get("/", function(req, res) {
  res.sendfile(__dirname + '/www/index.html');
})
app.get("/bundle.js", function(req, res) {
  res.sendfile(__dirname + '/www/bundle.js');
})

app.get('/api/hello', function(req, res) {
  res.status(200).send('hello, public');
});

app.use('/api/private', jwtCheck);
app.get('/api/private/hello', function(req, res) {
  res.status(200).send('hello, private');
});

app.post('/api/sessions', function(req, res) {
  const token = jwt.sign({name: 'username'}, SECRET_KEY, { expiresIn: 60*60*5 });
  res.status(201).send({
    id_token: token
  });
});

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});

