import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

export default function Spinner({classess=""}) {
    return (
        <FontAwesomeIcon icon={faGear} spin size="2xl" className={classess || ""} />
    );
}