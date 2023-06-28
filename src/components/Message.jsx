import { useState, useEffect } from "react";

export default function Message({type="information", children, timeout=5000}) {
    const [ isClosed, setIsClosed ] = useState(false);

    // setup message background based on type
    let typeClass = "bg-yellow-300";
    let borderClass = "border-yellow-600";

    if ( type.toLowerCase() == 'error' ){
        typeClass = "border-red-600";
        borderClass =  "bg-red-300";
    }

    useEffect(() => {
        // hide message efter timeout
        const timer = setTimeout(() => {
            setIsClosed(true);
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
        <div className={`p-4 ${typeClass} ${borderClass} border-0 border-l-8 border-solid z-10 min-w-72 min-w-max absolute top-12 right-6`}>
            {children}
        </div>
    )
}