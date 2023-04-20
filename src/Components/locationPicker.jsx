import Locations from './locations.json'

export const LocationPicker = ({onLocationChange}) => {

    const changeLoc = (event) => {
        const [location, locName] = event.target.value.split(';');
        onLocationChange( location, locName );
    };

    return(
        <>
            <div className='flex flex-row text-black gap-1'>
                <select className='flex-auto bg-white' onChange={changeLoc}>
                    <option>--- Elije tu locación ---</option>
                    {
                        Locations.map(loc => (
                        <option key={loc.value} value={loc.value + ';' + loc.name}>{loc.name}</option>
                        ))
                    }
                </select>
            </div>
        </>
    );

}