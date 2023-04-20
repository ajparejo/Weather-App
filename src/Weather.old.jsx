import { useState, useEffect } from 'react'

export const Weather = () => {

  const [clima, setClima] = useState();

  const [icono, setIcono] = useState({
    ico: null,
    info: null
  });

  const [locacion, setLocacion] = useState('');

  const [coordenadas, setCoordenadas] = useState({
    lat: 0,
    lon: 0
  });

  const changeHandler = (e) => {
    e.preventDefault();
    setLocacion(document.getElementById('locacion').value);
  }

  const horaActual = new Date().getHours();

  const fondo = horaActual > 5 && horaActual < 19 ? "bg-[url('./Img/morsky.jpg')]" : "bg-[url('./Img/nigsky.jpg')]"

  const options = { method: 'GET' };

  useEffect(() => {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${locacion}&limit=5&appid=f5d644c7f153dae4c316e793ce3a8cb8`;
      const respuesta = fetch(url, options)
      respuesta
        .then(response => response.json())
        .then((data) => { setCoordenadas({ lat: data[0].lat, lon: data[0].lon }) })
        .catch(console.warn);
        console.log(coordenadas)
  }, [locacion]);

  useEffect(() => {
      if(coordenadas === null){
        console.log('prueba')
        navigator.geolocation.getCurrentPosition((position) => {
          let curLat = position.coords.latitude;
          let curLon = position.coords.longitude;
          const peticionApiClima = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${curLat}&lon=${curLon}&appid=f5d644c7f153dae4c316e793ce3a8cb8&units=metric`, options)
          peticionApiClima
            .then(response => response.json())
            .then(data => { setClima(data.main.temp.toFixed()), setIcono({ ico: data.weather[0].icon, info: data.weather[0].main }) })
            .catch(console.warn);
        });
      } else {
        const peticionApiClima = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordenadas.lat}&lon=${coordenadas.lon}&appid=f5d644c7f153dae4c316e793ce3a8cb8&units=metric`, options)
        peticionApiClima
          .then(response => response.json())
          .then(data => { setClima(data.main.temp.toFixed()), setIcono({ ico: data.weather[0].icon, info: data.weather[0].main }) })
          .catch(console.warn);
      }
  }, [coordenadas]);

  return (
    <>
      <div className={`flex flex-col items-center justify-center w-screen h-screen bg-cover ${fondo}`}>
        <h1 className='text-3xl font-bold mb-5'>Weather App</h1>
        <div className='grid md:w-[450px] w-80'>
          <form action="" className='mb-5 text-lg'>
            Ingrese ciudad:
                <input
              id='locacion'
              className='rounded-md mx-1 md:mx-2 w-28 md:w-[50%]'
              type="text"
            />
            <button
              onClick={changeHandler}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 md:py-2 px-2 md:px-4 rounded-full"
            >Enviar</button>
          </form>
        </div>
        <section className='flex flex-col items-center justify-center md:w-[450px] w-80 h-[30%] rounded-lg bg-[#123456] 
            shadow-3xl'>
          <p className='text-white text-3xl font-bold underline capitalize'>{locacion}</p>
          <div className='w-3/4 flex justify-between items-center'>
            <img src={`http://openweathermap.org/img/wn/${icono.ico}@2x.png`} alt={`${icono.info}`} />
            <p className='text-white text-[35px]'>{clima} ºC</p>
          </div>
        </section>
      </div>
    </>
  )
}
