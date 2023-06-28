import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import PokeCard from "../components/PokeCard";
import Message from "../components/Message";

export default function Start() {
    const [ pokemons, setPokemons ] = useState(null);
    const [ page, setPage ] = useState(1);
    const [ perPage, setPerPage ] = useState(20);
    const [ apiError, setAPIError ] = useState(null);
    const numResults = useRef(0); // save number of hits, we need to hold that value but it is not state
    const numPages = useRef(0); // save number of pages, we need to hold that value but it is not state
    
    useEffect(() => {
        // wrap fetch in a function to use async/await
        const getPokeAPI = async () => {
            const offset = (page-1) * perPage;
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${perPage}&offset=${offset}`,{cache: 'no-cache'});
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
        }

        getPokeAPI();

    },[page, perPage]);

    const handleSetPerPage = (e) => {
        setPerPage(e.target.value);
        setPokemons(null);
    };

    return (
        <Layout>

            {!pokemons && !apiError && <Spinner />}  {/* We could use a seperate state for loading but since if there is no data then pokemons is null */}
            
            {!pokemons && apiError && <Message type="error">{apiError}</Message>}

            {pokemons && 
                <>
                    <div className="flex justify-start mt-12">
                        <span className="mt-2 mr-2">Per page:</span>
                        <select onChange={handleSetPerPage} value={perPage} className="py-2 px-4">
                            <option value="20">20</option>
                            <option value="40">40</option>
                            <option value="60">60</option>
                        </select>
                    </div>
                    <div className="flex flex-wrap">
                        {pokemons.map((item, index) => <PokeCard name={item.name} url={item.url} key={index} />)}
                    </div>
                    <div className="flex justify-between mb-6">
                        <div className="text-opacity-50">
                            <p>Results: {numResults.current}</p>
                            <p>Page {page} of {numPages.current}</p>
                        </div>
                        <div></div>
                    </div>
                </>
            }

        </Layout>
    )
}