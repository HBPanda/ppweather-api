const weatherAPI = require('../services/weather');

exports.getForecast = async (req, res, next) => {
    return res.status(200).json({
        forecast: await weatherAPI.getWeatherForcast('Kingston')
    })
}