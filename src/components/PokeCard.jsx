
import config from "../config.json";
import Spinner from "../components/Spinner";
import { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

export default function PokeCard({name, id, style, handleToggleFavorite=null, favorites=[]}) {

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

    // get status and icon color if pokemon is set as favorite or not
    const isFavorite = favorites && favorites.find((item) => item.id == id) ? true : false;
    const toggleButtonColor = isFavorite ? "text-red-500" : "";

    return (
        <div className="p-6 bg-slate-600 m-4 text-white w-56 h-56 flex flex-col items-center justify-center align-middle">
            <div ref={imageRef} className="hidden">
                
                {handleToggleFavorite && <button className={`w-8 h-8 ${toggleButtonColor}`} title={isFavorite ? "Remove favorite" : "Add favorite"} onClick={handleSetToggleFavorite}><FontAwesomeIcon icon={!isFavorite ? faRegularHeart : faHeart} /></button>}
                <img src={`${imageURL}${id}.${imageType}`} alt={name} className="w-40 h-40" onLoad={handleLoadedImage} />

                <span className="capitalize text-sm">{name}</span>
            </div>

            <div ref={imageSpinnerRef}>
                <Spinner classess="opacity-70" />
            </div>
        </div>
    )
}