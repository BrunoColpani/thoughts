const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const flash = require('express-flash');
const db = require('./db/db');

// Import models
const Tought = require('./models/Toughts');
const User = require('./models/User');

//Import Routes
const toughtsRoutes = require('./routes/toughtsRoutes');
const authRoutes = require('./routes/authRoutes');

//Import Controller
const ToughtsController = require('./controllers/ToughtsController');

const app = express();
//Template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    name: "session",
    secret: " nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new fileStore({
        logFn: function () { },
        path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 360000),
        httpOnly: true
    }
}));

// flash messages
app.use(flash());

//salvar sessão na respostas
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session
    }
    next();
});

//routes
app.use('/toughts', toughtsRoutes);
app.use('/', authRoutes);

app.get('/', ToughtsController.showToughts);

db
    //.sync({force: true})
    .sync()
    .then(() => {
        app.listen(3000);
    })
    .catch((e) => console.log(e));