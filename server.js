const server = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/auth');
const forecastRoutes = require('./src/routes/forecast');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const mailer = require('./src/services/mailer');
const weather = require('./src/services/weather');
let cron = require('node-cron');
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use(cors());

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
server.use('/forecast', forecastRoutes);

server.get('/', function(req, res, next){
    res.send('PPWeather API');
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

cron.schedule('0 0 * * *', () => {
    console.log('Forecast email task initiated');
    mailer.sendEmail();
  });
