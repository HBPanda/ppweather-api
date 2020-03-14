const nodemailer = require('nodemailer');
const User = require('../models/user');
const weatherAPI = require('./weather');

async function getEmailListByCity(cityParam){
    let emailListString = '';
    let users = await User.find({ city: cityParam }).exec();
    users.map(user =>{
        emailListString = emailListString + user.email + ','
    });
    emailListString = emailListString.substr(0, emailListString.length -1);
    return emailListString;
}

async function getEmailListByRole(roleParam){
    let emailListString = '';
    let users = await User.find({ role: roleParam }).exec();
    users.map(user =>{
        emailListString = emailListString + user.email + ','
    });
    emailListString = emailListString.substr(0, emailListString.length -1);
    return emailListString;
}

exports.sendEmail = async () => {
    //Declare Montego Bay Mailing information
    let mbList = await getEmailListByCity('Montego Bay');
    let mbForecast = await weatherAPI.getWeatherForcast('Montego Bay');
    let mbSubject = '';
    let mbBody = '';

    //Declare Kingston Mailing information
    let kList = await getEmailListByCity('Kingston');
    let kForecast = await weatherAPI.getWeatherForcast('Kingston');
    let kSubject = '';
    let kBody = '';

    //Declare IT Mailing information
    let ITList = getEmailListByRole('IT');
    let ITSubject = '';
    let ITBody = '';

    for(let x = 0; x < mbForecast[0].length; x++){  
        if(mbForecast[0][x].weather[0].main == 'Clear'){
            mbSubject = 'Clear skies | Regular Scheduling';
            mbBody = 'Today there will be clear skies, the schedule will remain the same at 8 hours.';
        }
        else if(mbForecast[0][x].weather[0].main == 'Rain'){
            mbSubject = 'Rainy Schedule | Schedule Changed';
            mbBody = 'Today it will rain at ' + interval.day.getTime() + ', the schedule will be cut down to 4 hours.';
            break;
        }
    }

    for(let x = 0; x < kForecast[0].length; x++){      
        if(kForecast[0][x].weather[0].main == 'Clear'){
            kSubject = 'Clear skies | Regular Scheduling';
            kBody = 'Today there will be clear skies, the schedule will remain the same at 8 hours.';
        }
        else if(kForecast[0][x].weather[0].main == 'Rain'){
            kSubject = 'Rainy Schedule | Schedule Changed';
            kBody = 'Today it will rain at ' + interval.day.getTime() + ', the schedule will be cut down to 4 hours.';
            break;
        }
    }

    let mbMailOptions = {
        from: 'ppweatherkg@gmail.com',
        to: mbList,
        subject: mbSubject,
        text: mbBody
    }

    let kMailOptions = {
        from: 'ppweatherkg@gmail.com',
        to: kList,
        subject: kSubject,
        text: kBody
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ppweatherkg@gmail.com',
          pass: 'sgvjhosyldntulcr'
        }
    });

    transporter.sendMail(mbMailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

    transporter.sendMail(kMailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}
