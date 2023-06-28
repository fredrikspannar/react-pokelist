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

    return (
        <Layout>

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
                        {pokemons.map((item, index) => <PokeCard name={item.name} url={item.url} key={index} style={style.current.style} />)}
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