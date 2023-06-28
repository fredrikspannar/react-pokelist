

import Layout from "../components/Layout";
import { useState, useEffect, useCallback } from "react";
import Spinner from "../components/Spinner";
import config from "../config.json";


export default function Settings() {
    const [ savedSettings, setSavedSettings ] = useState([]);

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        // load from settings on load, run once
        let settings = JSON.parse(localStorage.getItem("settings"));
        if ( !settings ) settings = { style: "dream-world" };
        setSavedSettings(settings);
    },[]);

    const handleChangeStyle = (e) => {
        let newSettings = savedSettings;

        if ( !newSettings ) newSettings = {style: 'dream-world'};
        newSettings.style = e.target.value;
        
        // update settings in local storage
        localStorage.setItem("settings", JSON.stringify(newSettings));

        // force re-render of current page to reflect changes         
        forceUpdate();
    }

    if ( !savedSettings ) {
        return (
            <Layout>
                <Spinner />
            </Layout>
        );
    }

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

        </Layout>
    )
}