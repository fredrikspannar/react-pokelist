
import NavBar from "../components/Navbar";

export default function Layout({children}) {

    return (
        <>
            <div className="container mx-auto">
                <NavBar />
                <div className="pl-5 pr-5 lg:h-screen lg:mt-32">
                    {children}
                </div>
                <footer className="p-2 bg-slate-400 mt-12 text-sm lg:fixed lg:bottom-0 lg:w-full lg:left-0 text-center">
                    Pokémon and Pokémon character names are trademarks of <a href="https://nintendo.com" target="_blank">Nintendo</a>, data provided by <a href="https://pokeapi.co/" target="_blank">PokéAPI</a> and images served by Github from <a href="https://github.com/PokeAPI" target="_blank">The PokéAPI Project</a> 
                </footer>
            </div>
        </>
    )
} 