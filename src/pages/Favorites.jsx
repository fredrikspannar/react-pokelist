import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import PokeCard from "../components/PokeCard";

export default function Favorites() {
    const [ favorites, setFavorites ] = useState([]);
    const style = useRef(0);

    useEffect(() => {
        // get favorites from local storage on load
        let loadedFavorites = JSON.parse(localStorage.getItem("favorites"));
        if ( !loadedFavorites ) loadedFavorites = [];
        setFavorites( loadedFavorites );

        // get style of pokemon or set default
        style.current = JSON.parse(localStorage.getItem("settings"));
        if ( !style.current ) style.current = {style: 'dream-world'};        
    }, []);

    return (
        <Layout>

            <h2>Favorites</h2>

            {favorites.length == 0 && <p>No favorites has been selected yet. Go to the start-page and press the heart ( <FontAwesomeIcon icon={faRegularHeart} /> )</p>}

            {favorites.length > 0 &&  
                  <div className="flex flex-wrap justify-start">
                    {favorites.map((item, index) => <PokeCard name={item.name} id={item.id} key={index} style={style.current.style} />)}
                  </div>
            }
        </Layout>
    )
}