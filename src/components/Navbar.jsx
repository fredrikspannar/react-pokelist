import { Link, useLocation  } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHeart, faPalette, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    // get current url to set which link should be active
    const currentURL = useLocation().pathname;

    return (
        <>
            <nav className="bg-slate-400 p-6 flex items-start mb-6 lg:fixed lg:top-0 lg:w-full lg:left-0">
                <h1>React-Pokelist</h1>

                <ul className="flex items-start ml-12 space-x-6 mt-2">
                    <li><Link to="/" className={currentURL.length == 1 ? "navlink-active" : ""}><FontAwesomeIcon icon={faHouse} /> Start</Link></li>
                    <li><Link to="/favorites" className={currentURL.includes("favorites") ? "navlink-active" : ""}><FontAwesomeIcon icon={faHeart} /> My Favorites</Link></li>
                    <li><Link to="/settings" className={currentURL.includes("settings") ? "navlink-active" : ""}><FontAwesomeIcon icon={faPalette} /> Settings</Link></li>
                    <li><Link to="/about" className={currentURL.includes("about") ? "navlink-active" : ""}><FontAwesomeIcon icon={faCircleInfo} /> About</Link></li>
                </ul>

            </nav>
        </>
    )
}