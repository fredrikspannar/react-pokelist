import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import PokeList from "../components/PokeList";

export default function Start() {
    const [ pokemons, setPokemons ] = useState(null);
    const [ page, setPage ] = useState(0);
    const [ apiError, setAPIError ] = useState(null);

    useEffect(() => {
        const getPokeAPI = async () => {
            const offset = page * 20;
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`,{cache: 'no-cache'});
                const json = await response.json();
                setPokemons(json.results);
            } catch(e) {
                console.log('API error: ',e);
                setAPIError(e.message);
            }
        }

        getPokeAPI();
    },[page]);

    return (
        <>
            <Layout>

                <h2>Startpage</h2>

                {!pokemons && !apiError && <Spinner />}
                {apiError && apiError}

                {pokemons && <PokeList pokemons={pokemons} /> }
            </Layout>
        </>
    )
}