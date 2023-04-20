import { useState, useEffect } from 'react'
import { LocationPicker } from './Components/locationPicker'

export const Weather = () => {
  
  const [location, setLocation] = useState('--- Elije tu locación ---')
  
  const [locName, setLocName] = useState('')

  const handleLocationChange = (locationValue, locNameValue) => {
    setLocation(locationValue);
    setLocName(locNameValue);
  };
  
  const [coordenadas, setCoordenadas] = useState({
    lat: 0,
    lon: 0
  });

  const [info, setInfo] = useState({
    ico: '01d',
    str: null,
    wns: null,
    wnd: null,
    inf: null,
    hum: null
  });

  const [clima, setClima] = useState();

  const options = { method: 'GET' };

  useEffect(() => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=f5d644c7f153dae4c316e793ce3a8cb8`;
    const respuesta = fetch(url, options)
    respuesta
      .then(response => response.json())
      .then((data) => { setCoordenadas({ lat: data[0].lat, lon: data[0].lon }) })
      .catch(console.warn);
  }, [location]);

  useEffect(() => {
    const peticionApiClima = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordenadas.lat}&lon=${coordenadas.lon}&appid=f5d644c7f153dae4c316e793ce3a8cb8&units=metric`, options)
    peticionApiClima
      .then(response => response.json())
      .then(data => { setClima(data.main.temp.toFixed()), setInfo({ ico: data.weather[0].icon, wns:data.wind.speed, wnd:data.wind.deg, str:data.main.feels_like.toFixed(), hum:data.main.humidity, inf: data.weather[0].main }) })
      .catch(console.warn);
  }, [coordenadas]);

  return (
    <>
      <div className='flex flex-col items-center justify-center w-screen h-screen bg-cover bg-black text-white'>
        <section className='grid grid-rows-[3%_50%_45%] gap-3 rounded-2xl p-3 w-[90%] md:w-[78%] lg:w-[48%] h-[90%] bg-blue-600 object-cover grow-0'>
        <LocationPicker onLocationChange={handleLocationChange} />
          <div className='flex flex-col w-[100%] h-[100%] gap-1 bg-white bg-opacity-20 items-center justify-center rounded-2xl'>
            <p className='mb-4 font-bold text-lg md:text-2xl'>{locName}</p>
            <img className='h-24 w-24' src={`./${info.ico}.svg`}/>
            <p className='my-2 text-6xl font-bold'>{clima} ºC</p>
            <p className='text-xl font-bold'>{info.inf}</p>
            <p className='text-xl'>Lunes, 01 Ene</p>
          </div>
          <div className='grid grid-cols-[45%_8%_45%] gap-1 w-[100%] h-[96%] bg-white bg-opacity-20 rounded-2xl overflow-hidden'>
            <div className='flex flex-col items-center justify-center h-[100%]'>
              <p>Viento</p>
              <p><span className='mt-2 text-4xl font-bold'>{info.wns}</span> <sup className='text-sm'>mt/s</sup></p>
            </div>
            <div className='flex items-center justify-center row-span-2'>
              <p className='rotate-90 font-bold'>
                <span className='text-2xl align-middle'>O</span>
                <span className='text-2xl align-middle'>·</span>
                <span className='text-2xl align-middle'>O</span>
                <span className='text-2xl align-middle'>·</span>
                <span className='text-2xl align-middle'>O</span>
                <span className='text-2xl align-middle'>·</span>
                <span className='text-2xl align-middle'>O</span>
                <span className='text-2xl align-middle'>·</span>
                <span className='text-2xl align-middle'>O</span>
                <span className='text-2xl align-middle'>·</span>
                <span className='text-2xl align-middle'>O</span>
              </p>
            </div>
            <div className='flex flex-col items-center justify-center h-[100%]'>
              <p>Sensacion</p>
              <p><span className='mt-2 text-4xl font-bold'>{info.str}</span><sup> ºC</sup></p>
            </div>
            <div className='flex flex-col items-center justify-center h-full'>
              <p>Dirección</p>
              <p><span className='mt-2 text-4xl font-bold'>{info.wnd}</span><sup> º</sup></p>
            </div>
            <div className='flex flex-col items-center justify-center h-full'>
              <p>Humedad</p>
              <p className='mt-2 text-4xl font-bold'>{info.hum}%</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
