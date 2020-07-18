import "./sass/style.sass"
import ApiWeather from './api/ApiWeather.js';

(function($) {
    $(document).ready(() => {

        const $apiWeather = new ApiWeather;
        const $date = new Date();


        $apiWeather.getWeater('current', 'Dnipro', 'metric', (data) => {
            $('.block1 h2').text(`${data.name}, ${data.sys.country}`);
            $('.icon img')
                .prop('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
                .prop('alt', data.weather[0].description);
            $('.icon span').text(data.weather[0].main);
            $('.degree').text(Math.floor(+data.main.temp));
            $('.time').text(`${$date.toLocaleTimeString('ru-RU').slice(0,5)} ${$date.toLocaleDateString('ru-RU')}`);
            $('.wind').text((data.wind.speed)*3.6);//convert m/s to km/h
            try {
                $('.precip').text(data.precipitation.value);
            } catch (e) {
                $('.precip').text('(no data)');
            }
            $('.pressure').text(data.main.pressure);

        });

        $apiWeather.getWeater('forecast', 'Dnipro', 'metric', (data) => {

            const $elDay = $('.day');
            const $elDate = $('.date');
            const $elIcon = $('.icon-forecast');
            const $elDegree = $('.degree-forecast');

            let $acc = 0, $curDate, $formatDate, $average, $nextDay = ($date.getDay()+1 === 7)? 0: $date.getDay()+1;

            for(let $i = 0; $i < data.list.length; $i++) {

                $curDate = new Date(data.list[$i].dt_txt);

                //get data from array of data.list and parse them
                if($curDate.getDay() === $nextDay) {

                    //set day of week
                    $($elDay.get($acc)).text($curDate.toString().slice(0,3));

                    //set date of day
                    $formatDate = $curDate.toLocaleDateString('ru-RU');
                    $($elDate.get($acc)).text(`${$formatDate.slice(0,6)}${$formatDate.slice(8,10)}`);

                    //set degree and icon
                    $average = ($i+4 >= data.list.length)? data.list.length-1: $i+4;
                    $($elDegree.get($acc))
                        .text(Math.floor(+(data.list[$average].main.temp)));
                    $($elIcon.get($acc))
                        .attr('src', `http://openweathermap.org/img/wn/${data.list[$average].weather[0].icon}@2x.png`)
                        .attr('alt', data.list[$average].weather[0].description);
                    $acc++;
                    $nextDay = ($nextDay+1 === 7)? $nextDay = 0: $nextDay+1;
                }
            }
        });
    });
})(jQuery);