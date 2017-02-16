var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');

module.exports = function () {
    var app = express();

    app.use(cookieParser());
    app.use(session(
        {
            secret: 'homem avestruz',
            resave: true,
            saveUninitialized: true
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(helmet());

    // Solucoes para seguranca do site
    app.use(helmet.frameguard({ action: 'sameorigin' }));
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.disable('x-powered-by');

    // variável de ambiente
    app.set('port', 3000);

    // middleware
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    // usar header da requisição o Content-type X-HTTP-Method-Override
    // requisição seja parseada através do middleware body-parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    app.use(express.static('./public'));

    load('models', { cwd: 'app' })
        .then('controllers')
        .then('routes/auth.js')
        .then('routes')
        .into(app);

    // se nenhum rota atender, direciona para página 404
    app.get('*', function(req, res) {
        res.status(404).render('404');
    });

    return app;
};