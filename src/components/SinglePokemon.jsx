import { Link } from "react-router-dom";

export default function SinglePokemon({pokemon}) {

    const formatStatName = (name) => {
        if ( name.includes('special-') ) {
            return name.replace('special-','Sp. ')
        } else {
            return name;
        }
    }

    return (
        <>
            <div className="mb-6"><Link className="btn" to="/">&lt; Back</Link></div>
            <div className="p-4 border-4 rounded-lg shadow-lg bg-slate-200">
                <h2 className="capitalize">{pokemon.name}</h2>
                <div className="flex p-4">
                    <div className="w-1/3"><img src={pokemon.image} alt={pokemon.name} className="h-60 w-60" /></div>
                    <div className="w-1/3">
                        <h4 className="mb-4">Data</h4>
                        <table className="text-sm" cellPadding="6" cellSpacing="6">
                            <tbody>
                                <tr>
                                    <td><span className="text-slate-600">Type</span></td>
                                    <td>
                                        {pokemon.types.map((item, index) => <span key={`type-${index}`} className="capitalize">{item.type.name}</span> )}
                                    </td>
                                </tr>
                                <tr>
                                    <td><span className="text-slate-600">Species</span></td>
                                    <td><span className="capitalize">{pokemon.species.name}</span></td>
                                </tr>    
                                <tr>
                                    <td><span className="text-slate-600">Height</span></td>
                                    <td>{pokemon.height}</td>
                                </tr>   
                                <tr>
                                    <td><span className="text-slate-600">Weight</span></td>
                                    <td>{pokemon.weight}</td>
                                </tr>                                                                               
                            </tbody>
                        </table>
                    </div>
                    <div className="w-1/3">
                        <h4 className="mb-4">Stats</h4>
                        <table className="text-sm" cellPadding="6" cellSpacing="6">
                            <tbody>
                                {pokemon.stats.map((item, index) => <tr>
                                    <td><span className="text-slate-600 capitalize">{formatStatName(item.stat.name)}</span></td>
                                    <td>{item.base_stat}</td>
                                </tr>)}
                            </tbody>
                        </table>                        
                    </div>
                </div>
            </div>
        </>
    )
}