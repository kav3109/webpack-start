export  default class ApiWeather {

    getWeater(type, city, metric, func) {
        if(type !== 'current' && type !== 'forecast') {
            console.error(`Wrong param (${type}), it should contain "current" or "forecast" value!`);
            return;
        }
        const URL = (type === 'current')? 'https://api.openweathermap.org/data/2.5/weather':
            'https://api.openweathermap.org/data/2.5/forecast';

        const jqXHR = $.get(URL, {
            "q":city,
            "units":metric,
            "appid":"5d5250ec566dbf9c35daf7cd14955e3c"
        });
        jqXHR.then(function success(data) {
            func(data);
        }, function error(jqXHR) {
            console.log(jqXHR);
        });
    }
}