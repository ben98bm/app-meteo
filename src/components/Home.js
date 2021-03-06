import React, { useState } from 'react'
import "./Home.css";
import { Link } from 'react-router-dom';

function Home() {

    const [weatherData, setWeatherData] = useState([{}]);
    const apiKey = '8b890cfc7e92fbb2efe82743f61e601e';
    const [city, setCity] = useState('');
    const [unit, setUnit] = useState(true);

    let json = require('./recents.json');

    const dateBuilder = (d) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', "October", 'November', 'December'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${month} ${date}, ${year}`
    }





    return (
        <div className={(typeof weatherData.main != 'undefined') ? ((weatherData.main.temp > 50) ? 'app warm' : 'app') : 'app'}>
            <main>
                <div className='search-box'>
                    <input type='p'
                        className='search-bar'
                        placeholder='Enter City...'
                        onChange={e => setCity(e.target.value)}
                        value={city}
                        // onKeyPress={search}
                    />
                </div>

                {(weatherData.cod === '404') ? (
                    <p class='error'>No city found. Maybe try just putting the city name?</p>
                ) : ('')}
                <br></br>
                {(typeof weatherData.main != 'undefined') ? (
                    <div>
                        <div className='location-box'>
                            <div className='location'>{weatherData.name}, {weatherData.sys.country}</div>
                            <div className='date'>{dateBuilder(new Date())}</div>
                        </div>

                        <div className='weather-box'>
                            <div className='temp' onClick={() => unit ? setUnit(false) : setUnit(true)}>{unit ? <p>{Math.round(weatherData.main.temp)}??F</p> : <p>{Math.round((weatherData.main.temp - 32) * 5 / 9)}??C</p>}</div>
                            {unit ? <p className='min-max'>Min: {Math.round(weatherData.main.temp_min)}??F / Max: {Math.round(weatherData.main.temp_max)}??F</p> : <p className='min-max'>Min: {Math.round((weatherData.main.temp_min - 32) * 5 / 9)}??C / Max: {Math.round((weatherData.main.temp_max - 32) * 5 / 9)}??C</p>}
                            <div className='weather'>{weatherData.weather[0].main}</div>
                        </div>


                    </div>
                ) : (
                    <div>
                        <div className='location-box'>
                            <div className='location'>App-Meteo</div>
                            <div className='date'>{dateBuilder(new Date())}</div>
                        </div>

                        <div className='weather-box'>
                            <div className='weather'></div>
                        </div>


                    </div>
                )}





            </main>

        </div >

    )
}

export default Home;
