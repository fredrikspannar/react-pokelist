import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import PokeCard from "../components/PokeCard";
import Message from "../components/Message";
import config from "../config.json";

export default function Start() {
    const [ pokemons, setPokemons ] = useState(null);
    const [ page, setPage ] = useState(1);
    const [ perPage, setPerPage ] = useState(20);
    const [ apiError, setAPIError ] = useState(null);
    const numResults = useRef(0); // save number of hits, we need to hold that value but it is not state
    const numPages = useRef(0); // save number of pages, we need to hold that value but it is not state
    const style = useRef(0);

    const [ favorites, setFavorites ] = useState([]);
    const [ successMessage, setSuccessMessage ] = useState(false);

    useEffect(() => {
        // get favorites from local storage on load
        let loadedFavorites = JSON.parse(localStorage.getItem("favorites"));
        if ( !loadedFavorites ) loadedFavorites = [];
        setFavorites( loadedFavorites );
    }, []);

    useEffect(() => {
        // update favorites in local storage
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        // wrap fetch function to use async await
        const getPokeAPI = async () => {
            const offset = (page-1) * perPage;
            try {
                const response = await fetch(`${config.apiURL}?limit=${perPage}&offset=${offset}`,{cache: 'no-cache'});
                const json = await response.json();
    
                // set data
                setPokemons(json.results);
    
                // set and calculate number of pages
                numResults.current = Number(json.count);
                numPages.current = Math.floor(numResults.current / perPage);
    
            } catch(e) {
                console.error('API error: ',e);
    
                setAPIError("Failed to fetch from PokeAPI");
                setPokemons(null);
            }
        };

        getPokeAPI();

        // get style of pokemon or set default
        style.current = JSON.parse(localStorage.getItem("settings"));
        if ( !style.current ) style.current = {style: 'dream-world'};

    },[page, perPage]);

    const handleSetPerPage = (e) => {
        // set new number per page and clear results
        setPerPage(e.target.value);
        setPokemons(null);
    };

    const handlePrevious = (e) => {
        setPokemons(null);
        setPage(page-1);
    }

    const handleNext = (e) => {
        setPokemons(null);
        setPage(page+1);
    }

    const handleToggleFavorite = (id, name) => {
        const exists = favorites && favorites.find((item) => item.id == id) ? true : false;

        if ( favorites.length > 0 && exists) {
            // remove
            const newFavorites = favorites.filter((item) => item.id !== id);
            
            setFavorites(newFavorites);
            setSuccessMessage("Favorite has been removed");

        } else {
            // add
            const newFavorite = {
                id: id,
                name: name
            };

            setFavorites([...favorites, newFavorite]);
            setSuccessMessage("New favorite has been saved");
        }
    }

    const getIdFromURL = (url) => {
        // url is for example https://pokeapi.co/api/v2/pokemon/1/
        // where the last part after "pokemon" is the id we need
        // so first we split by / and then filter the array to
        // only numbers and then map the array with number which
        // will typecast string into a number and finally shift the array
        // to only get the first item
        const urlParts = url.split('/');
        return urlParts.filter(Number).map(Number).shift();
    }

    const clearSuccessMessage = () => {
        setSuccessMessage(false);
    }

    return (
        <Layout>
            {successMessage && <Message onTimeoutCallback={clearSuccessMessage}>{successMessage}</Message>}

            {!pokemons && !apiError && <Spinner />}  {/* We could use a seperate state for loading but since if there is no data then pokemons is null */}
            
            {!pokemons && apiError && <Message type="error">{apiError}</Message>}

            {pokemons && 
                <>
                    <div className="flex justify-start mt-12">
                        <span className="mt-2 mr-2">Per page:</span>
                        <select onChange={handleSetPerPage} value={perPage} className="py-2 px-4 rounded-xl bg-yellow-300">
                            <option value="20">20</option>
                            <option value="40">40</option>
                            <option value="60">60</option>
                            <option value="80">80</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        {pokemons.map((item, index) => <PokeCard name={item.name} id={getIdFromURL(item.url)} key={index} style={style.current.style} handleToggleFavorite={handleToggleFavorite} favorites={favorites} />)}
                    </div>
                    <div className="flex justify-between mb-6">
                        <div className="text-opacity-50">
                            <p>Results: {numResults.current}</p>
                            <p>Page {page} of {numPages.current}</p>
                        </div>
                        <div>
                            {page > 1 && <button className="btn" onClick={handlePrevious}>&lt; Previous</button> }
                            {page < numPages.current && <button className="btn ml-2" onClick={handleNext}>Next &gt;</button> }
                        </div>
                    </div>
                </>
            }

        </Layout>
    )
}