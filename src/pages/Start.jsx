import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import PokeCard from "../components/PokeCard";
import Message from "../components/Message";

export default function Start() {
    const [ pokemons, setPokemons ] = useState(null);
    const [ page, setPage ] = useState(0);
    const [ apiError, setAPIError ] = useState(null);
    const numResults = useRef(0); // save number of hits, we need to hold that value but it is not state
    const numPages = useRef(0); // save number of pages, we need to hold that value but it is not state

    useEffect(() => {
        // wrap fetch in a function to use async/await
        const getPokeAPI = async () => {
            const offset = page * 20;
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`,{cache: 'no-cache'});
                const json = await response.json();
                
                setPokemons(json.results);

                numResults.current = json.count;

            } catch(e) {
                console.error('API error: ',e);

                setAPIError("Failed to fetch from PokeAPI");
                setPokemons(null);
            }
        }

        getPokeAPI();

    },[page]);

    return (
        <>
            <Layout>

                {!pokemons && !apiError && <Spinner />}  {/* We could use a seperate state for loading but since if there is no data then pokemons is null */}
                
                {!pokemons && apiError && <Message type="error">{apiError}</Message>}

                {pokemons && <div className="flex flex-wrap">
                    {pokemons.map((item, index) => <PokeCard name={item.name} url={item.url} key={index} />)}
                </div> }
                
            </Layout>
        </>
    )
}