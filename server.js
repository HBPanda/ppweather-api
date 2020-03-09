const server = require('express')();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({extended: false}));

server.get('/', function(req, res, next){
    res.send('PPWeather');
});

server.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

server.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

server.listen(PORT, function(){
    console.log('listening on *:' + PORT);
});