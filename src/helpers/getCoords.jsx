

export const getCoords = () => {
    
    const options = {method: 'GET'};

    //const url =`http://api.openweathermap.org/geo/1.0/direct?q=${ encodeURI(ubicacion) }&limit=5&appid=f5d644c7f153dae4c316e793ce3a8cb8`;
    const url =`http://api.openweathermap.org/geo/1.0/direct?q=Puerto Ordaz&limit=5&appid=f5d644c7f153dae4c316e793ce3a8cb8`;
    const respuesta = fetch(url, options)
        .then(response => response.json())
        .then(data => console.log(data[0].lat, data[0].lon))
        .catch(console.warn)
    // return localizacion;

}