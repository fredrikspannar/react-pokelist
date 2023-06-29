
import Layout from "../components/Layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function NotFound() {

    return (
        <Layout>
            
            <div className="flex justify-center">
                <h2 className="mt-32"><FontAwesomeIcon className="mr-4" icon={faTriangleExclamation} size="2xl" />404 Not found</h2>
            </div>

        </Layout>
    );
}