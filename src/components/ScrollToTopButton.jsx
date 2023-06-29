import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function ScrollToTopButton() {
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
          if (window.pageYOffset > 300) {
            setShowScrollButton(true);
          } else {
            setShowScrollButton(false);
          }
        });
    }, []);
    
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    };

    return (
        <>
          {showScrollButton && <button onClick={scrollToTop} title="Scroll to top" className="bg-slate-300 rounded-full fixed h-16 w-16 z-30 right-4 bottom-12 text-5xl opacity-70 text-slate-800"><FontAwesomeIcon icon={faArrowUp} /></button>}   
        </>
    );
}