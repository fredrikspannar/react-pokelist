
import NavBar from "../components/Navbar";

export default function Layout({children}) {

    return (
        <>
            <div className="container mx-auto">
                <NavBar />
                <div className="pl-5 pr-5">
                    {children}
                </div>
            </div>
        </>
    )
} 