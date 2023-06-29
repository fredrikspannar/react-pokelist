import { useParams } from "react-router";
import { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import config from "../config.json";
import SinglePokemon from "../components/SinglePokemon";

export default function ShowPokemon() {
    const [ pokemon, setPokemon ] = useState(false);
    const { name, id } = useParams();
    const style = useRef(0);

    useEffect(() => {
         // wrap fetch function to use async await
         const getPokeAPI = async () => {
            const response = await fetch(`${config.apiURL}/pokemon/${name}`,{cache: 'no-cache'});
            const json = await response.json();

            // setup image type based on style
            const imageURL = `${config.baseImageURL}/${style.current.style}/`;
            const imageType = ( style.current.style == "dream-world" ? "svg" : "png" );

            // set data and add a property for image with full path
            setPokemon({... json, image: `${imageURL}${id}.${imageType}`});

         };
        
        getPokeAPI();

        // get style of pokemon or set default
        style.current = JSON.parse(localStorage.getItem("settings"));
        if ( !style.current ) style.current = {style: 'dream-world'};
    },[name, id]);

console.log('pokemon =>',pokemon);

    return (
        <Layout>
            {!pokemon && <Spinner /> }

            {pokemon && <SinglePokemon pokemon={pokemon} />}

        </Layout>
    );
}