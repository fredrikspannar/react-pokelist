

import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import config from "../config.json";


export default function Settings() {
    const [ savedSettings, setSavedSettings ] = useState(JSON.parse(localStorage.getItem("settings")));

    /*useEffect(() => {
        /// side-effect with localstorage should be put in useEffect or an eventhandler
       
        const newSettings = JSON.parse(localStorage.getItem("settings"));

        console.log('on load with newSettings = ',newSettings);

        setSavedSettings(newSettings);

    },[]); */


    const handleChangeStyle = (e) => {
        

        let newSettings = savedSettings;

        if ( !newSettings ) newSettings = {style: 'dream-world'};

        newSettings.style = e.target.value;
        setSavedSettings(newSettings);        

        localStorage.setItem('settings', JSON.stringify(newSettings));

        console.log('handleChangeStyle newSettings = ',newSettings);
    }


    if ( !savedSettings ) {
        return (
            <Layout>
                <Spinner />
            </Layout>
        );
    }

    console.log('rendering with settings = ',savedSettings);

    return (
        <Layout>

            <h2>Settings</h2>
            
            <fieldset className="p-2">
                <p>
                    <label htmlFor="style" className="mr-2">Style:</label>
                    <select className="py-2 px-4" value={savedSettings.style} onChange={handleChangeStyle}>
                        <option value="official-artwork">Official</option>
                        <option value="dream-world">DreamWorld</option>
                    </select>
                </p>
                
                <p className="mt-4">Example:</p>
                <p className={savedSettings.style != "dream-world" ? "hidden" : null}>
                    <img src={`${config.baseImageURL}dream-world/25.svg`} alt="dream-world" className="w-20 h-20" />
                    DreamWorld
                </p>
                <p className={savedSettings.style != "official-artwork" ? "hidden" : null}>
                    <img src={`${config.baseImageURL}official-artwork/25.png`} alt="official" className="w-20 h-20"/>
                    Official
                </p>
            </fieldset>

{savedSettings.style}

        </Layout>
    )
}