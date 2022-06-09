import React, { useState } from 'react';
import axios from 'axios';


function todayTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}


const Today = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  // eslint-disable-next-line
  let todaysTime = todayTime(new Date);


  return `${todaysTime}, ${day} - ${date} ${month} ${year}`
}


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');


  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=734ee356efb6490301d13e39dbbd7991`


  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(apiURL).then((response) => {
        setData(response.data)
        // console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <>
      <div className="wotdaweather mt-14 text-center">
        <h1 className="brandName my-10 drop-shadow-lg">WotDaWeather</h1>

        <div className="flex text-center justify-center drop-shadow-lg">
          <div className="flex border-2 rounded">
            <input type="text" className="px-4 py-2 w-56 bg-transparent  text-white" value={location}
              onChange={event => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              placeholder='Enter Location' />
            <button className="flex items-center justify-center px-4 border-l">
              <svg className="w-6 h-6 text-white" fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="news flex text-center justify-center mt-10 mb-7">
          <div>
            <h2 className="temp text-7xl mt-3 mr-1 drop-shadow-lg">{data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : <h1>5°C</h1>}</h2>
          </div>

        </div>

        <div className="city mb-10">
          {/* <h2 className="city text-4xl drop-shadow-lg">{data.name}</h2> */}
          <h2 className="city text-4xl drop-shadow-lg">{data.name ? <span>{data.name}</span> : <span>Pakistan</span>}, {data.sys ? <span>{data.sys.country}</span> : <span>World</span>}</h2>
          <div className="dateTime">
            <span className="time drop-shadow-lg">{Today(new Date())}</span>
          </div>
        </div>


        <div className=' grid place-items-center ml-1'>
          <div className="weatherDetails bg-black rounded-lg bg-opacity-60 px-5 py-7">
            <div className='pb-7 font-bold'>
              - Weather Details -
            </div>
            <div className='flex text-center justify-center space-x-14 '>
              <div>
                <div className='font-semibold'>Weather</div>
                {/* <span className="condition text-1xl drop-shadow-lg">{data.weather ? <p>{data.weather[0].main}</p> : <p>Clear</p>}</span> */}

                {/* <div>{data.main ? <p>{data.clouds.all.toFixed()}%</p> : <p>55%</p>}</div> */}
                <div>{data.weather ? <p>{data.weather[0].main}</p> : <p>Clear</p>}</div>
                <div></div>
              </div>
              <div>
                <div className='font-semibold'>Humidity</div>
                <div>{data.main ? <p>{data.main.humidity}%</p> : <p>55%</p>}</div>
              </div>
              <div>
                <div className='font-semibold'>Wind</div>
                <div> {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : <p>5 MPH</p>}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
