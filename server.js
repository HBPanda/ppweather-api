const server = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/auth');
const PORT = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

mongoose.connect(
    'mongodb+srv://ppweatheradmin:' + 
    process.env.MONGO_ATLAS_PW + 
    '@cluster0-xfiit.mongodb.net/test?retryWrites=true&w=majority', 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);

server.use('/auth', authRoutes);

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