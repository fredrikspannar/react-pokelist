import PokeCard from "./PokeCard";

export default function PokeList({pokemons}) {

    return (
        <div className="flex flex-wrap">
            {pokemons.map((item, index) => <PokeCard name={item.name} url={item.url} key={index} />)}
        </div>
    );
}