import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";

export default function SinglePokemonMoveRow({item}) {
    const [ data, setData ] = useState(false);
    
    useEffect(() => {
         // wrap fetch function to use async await
         const getPokeAPI = async () => {
            const response = await fetch(item.url,{cache: 'no-cache'});
            const json = await response.json();

            // set data and add a property for image with full path
            setData({... json});

         };
        
        getPokeAPI();

    },[item]);

    if ( !data ) return (
        <tr>
            <td colSpan="5">
                <Spinner size="lg" />
            </td>
        </tr>
    );

    return (
        <tr>
            <td><span className="capitalize">{item.name}</span></td>
            <td><span className="capitalize">{data.type.name}</span></td>
            <td><span className="capitalize">{data.damage_class.name}</span></td>
            <td><span className="capitalize">{data.power}</span></td>
            <td><span className="capitalize">{data.accuracy}</span></td>
        </tr>
    );
}