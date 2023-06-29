import Spinner from "../components/Spinner";
import config from "../config.json";
import { useEffect, useState } from "react";

export default function SinglePokemonTrainingBreeding({baseExperience, id}) {
    const [ data, setData ] = useState(false);

    useEffect(() => {
         // wrap fetch function to use async await
         const getPokeAPI = async () => {
            const response = await fetch(`${config.apiURL}/pokemon-species/${id}`,{cache: 'no-cache'});
            const json = await response.json();

            // set data and add a property for image with full path
            setData({... json});

         };
        
        getPokeAPI();

    },[]);

    if ( !data ) return <Spinner size="lg" />;

    const genderRate = (rate) => {
        // API has this in 1/8
        return (rate/8) * 100;
    }

    return (
        <>
            <h4 className="mb-4">Training</h4>
            <table className="text-sm" cellPadding="6" cellSpacing="6">
                <tbody>   
                    <tr>
                        <td><span className="text-slate-600">Catch rate</span></td>
                        <td>{data.capture_rate}</td>
                    </tr>   
                    <tr>
                        <td><span className="text-slate-600">Base friendship</span></td>
                        <td>{data.base_happiness}</td>
                    </tr>  
                    <tr>
                        <td><span className="text-slate-600">Base exp.</span></td>
                        <td>{baseExperience}</td>
                    </tr>  
                    <tr>
                        <td><span className="text-slate-600">Growth rate</span></td>
                        <td><span className="capitalize">{data.growth_rate.name}</span></td>
                    </tr>                                           
                </tbody>
            </table>        

            <h4 className="mb-4 mt-8">Breeding</h4>
            <table className="text-sm" cellPadding="6" cellSpacing="6">
                <tbody>   
                    <tr>
                        <td><span className="text-slate-600">Egg Groups</span></td>
                        <td>
                        {data.egg_groups.map((item, index) => <span key={`egg-group-${index}`} className="capitalize">{index > 0 ? ', ' : ''}{item.name}</span>)}
                        </td>
                    </tr>   
                    <tr>
                        <td><span className="text-slate-600">Gender</span></td>
                        <td>{genderRate(data.gender_rate)} % male/female</td>
                    </tr>  
                    <tr>
                        <td><span className="text-slate-600">Egg cycles</span></td>
                        <td>{data.hatch_counter}</td>
                    </tr>                                            
                </tbody>
            </table>
        </>
    );
}