
import config from "../config.json";
import Spinner from "../components/Spinner";
import { useRef } from "react";

export default function PokeCard({name, url, style}) {
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

    const handleLoadedImage = () => {
        imageSpinnerRef.current.classList = "hidden";
        imageRef.current.classList = "";
    }

    return (
        <div className="p-6 bg-slate-600 m-4 text-white w-56 h-56 flex flex-col items-center justify-center align-middle">
            <div ref={imageRef} className="hidden">
                <img src={`${imageURL}${id}.${imageType}`} alt={name} className="w-40 h-40" onLoad={handleLoadedImage} />
                <span className="capitalize text-sm">{name}</span>
            </div>

            <div ref={imageSpinnerRef}>
                <Spinner />
            </div>
        </div>
    )
}