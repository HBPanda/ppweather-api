//for openweather api
//sample
const axios = require('axios');

exports.getWeatherForcast = async (city) => {
    //Replace whitespace with ascii equivalent
    city = city.replace(' ', '%20');
    const weatherApiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + 
        city + 
        '&appid=50f9b441ba1a483806e77978ab5a2fe0' +
        '&units=metric';
    
    //Get raw data from api
    response = await axios.get(weatherApiUrl);
    list = response.data.list;

    let days = [];
    let day = [];
    let currentDay = new Date(list[0].dt_txt);

    //Modify api data to a more digestable format. Each 
    for(let x = 0; x < list.length; x++){
        dayObj = new Date(list[x].dt_txt)
        let dayObject = {
            temp: list[x].main.temp,
            weather: list[x].weather,
            day: dayObj,
            dayWeek: dayObj.toLocaleDateString('en-us', {  weekday: 'long' }),
            time: dayObj.getUTCHours() + ":00"
        }
        //Check if the current day object is within the last checked day
        if(dayObject.day.getDate() == currentDay.getDate()){
            //Append time interval to the last checked day
            day.push(dayObject);
        }
        else{
            //Start appending time intervals to the next day
            currentDay = dayObject.day;
            days.push(day);
            day = [];
            day.push(dayObject);

        }
    }
    return days;
}