
import config from "../config.json";
import Spinner from "../components/Spinner";
import { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

export default function PokeCard({name, url, style, handleToggleFavorite, favorites=[]}) {
    // url is for example https://pokeapi.co/api/v2/pokemon/1/
    // where the last part after "pokemon" is the id we need
    // so first we split by / and then filter the array to
    // only numbers and then map the array with number which
    // will typecast string into a number and finally shift the array
    // to only get the first item
    const urlParts = url.split('/');
    let id = urlParts.filter(Number).map(Number).shift();

    // setup image type based on style
    const imageURL = `${config.baseImageURL}/${style}/`;
    const imageType = ( style == "dream-world" ? "svg" : "png" )

    // create refs to show the real image when it has been loaded and disable the spinner
    const imageRef = useRef(null);
    const imageSpinnerRef = useRef(null);

    // event when image has been loaded - disable spinner
    const handleLoadedImage = () => {
        imageSpinnerRef.current.classList = "hidden";
        imageRef.current.classList = "";
    }

    const handleSetToggleFavorite = () => {
        // call parent event handler
        handleToggleFavorite(id, name);
    }

    // get status if pokemon is set as favorite or not
    const isFavorite = favorites && favorites.find((item) => item.id == id) ? true : false;

    return (
        <div className="p-6 bg-slate-600 m-4 text-white w-56 h-56 flex flex-col items-center justify-center align-middle">
            <div ref={imageRef} className="hidden">
                
                <button className="w-8 h-8" onClick={handleSetToggleFavorite}><FontAwesomeIcon icon={!isFavorite ? faRegularHeart : faHeart} /></button>
                <img src={`${imageURL}${id}.${imageType}`} alt={name} className="w-40 h-40" onLoad={handleLoadedImage} />

                <span className="capitalize text-sm">{name}</span>
            </div>

            <div ref={imageSpinnerRef}>
                <Spinner classess="opacity-70" />
            </div>
        </div>
    )
}