
const imageURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';

export default function PokeCard({name, url}) {
    // url is for example https://pokeapi.co/api/v2/pokemon/1/
    // where the last part after "pokemon" is the id we need
    // so first we split by / and then filter the array to
    // only numbers and then map the array with number which
    // will typecast string into a number and finally shift the array
    // to only get the first item
    const urlParts = url.split('/');
    let id = urlParts.filter(Number).map(Number).shift();

    return (
        <div className="p-6 bg-slate-600 m-4 text-white w-56 h-56 flex flex-col items-center align-middle">
            <img src={`${imageURL}${id}.svg`} alt={name} className="w-40 h-40" />
            <span className="capitalize">{name}</span>
        </div>
    )
}