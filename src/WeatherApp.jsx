import React, { useState } from 'react'

export const WeatherApp = () => {

    const URL_BASE = 'http://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '1a3c3101666943a8f92e36aa388eda3c';
    const DIFF_KELVIN = 273.15

    const [city, setCity] = useState('');
    const [dataWeather, setDataWeather] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.length > 0) fetchWeather();
    }

    const fetchWeather = async () => {
        try {
            const response = await fetch(`${URL_BASE}?q=${city}&appid=${API_KEY}`);
            const data = await response.json();
            setDataWeather(data);
            console.log(data);

        } catch (error) {
            console.error('Ocurrió el siguiente problema: ', error);
        }
    }


    return (
        <div className='container'>
            <h1>WeatherApp</h1>
            <hr />
            <br />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Start typing a city...'
                    value={city}
                    onChange={(e) => setCity(e.target.value)} />
                <button type="submit">Search</button>
            </form>

            {
                dataWeather && (
                    <div className='card'>
                        <h2>{dataWeather.name}</h2>
                        <p>Temperature: {parseInt(dataWeather.main.temp - DIFF_KELVIN)} ºC</p>
                        <p>Humidity: {dataWeather.main.humidity} %</p>
                        <p>Condition: {dataWeather.weather[0].description}</p>
                        <img src={`http://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`} />
                    </div>
                )
            }
        </div>
    )
}
