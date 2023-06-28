import React from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHeart, faPalette } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {

    return (
        <>
            <nav className="bg-slate-400 p-6 flex items-start mb-6">
                <h1>React-Pokelist</h1>

                <ul className="flex items-start ml-12 space-x-6 mt-2">
                    <li><Link to="/"><FontAwesomeIcon icon={faHouse} /> Start</Link></li>
                    <li><Link to="/favorites"><FontAwesomeIcon icon={faHeart} /> My Favorites</Link></li>
                    <li><Link to="/settings"><FontAwesomeIcon icon={faPalette} /> Settings</Link></li>
                </ul>

            </nav>
        </>
    )
}