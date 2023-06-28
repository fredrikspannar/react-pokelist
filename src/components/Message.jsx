import { useState, useEffect } from "react";

export default function Message({type="information", children, timeout=5000, onTimeoutCallback=false}) {
    const [ isClosed, setIsClosed ] = useState(false);

    // setup message background based on type
    let typeClass = "bg-green-300";
    let borderClass = "border-green-600";

    if ( type.toLowerCase() == 'error' ){
        typeClass = "border-red-600";
        borderClass =  "bg-red-300";
    }

    useEffect(() => {
        // hide message efter timeout
        const timer = setTimeout(() => {
            setIsClosed(true);

            if (onTimeoutCallback !== false) onTimeoutCallback();
        }, timeout);

        // cleanup side-effect
        return () => {
            clearTimeout(timer);
        }
    },[]); // no dependencies, run once

    // message should be hidden
    if ( isClosed ) return null;

    // render message
    return (
        <div className={`message ${typeClass} ${borderClass}`}>
            {children}
        </div>
    )
}