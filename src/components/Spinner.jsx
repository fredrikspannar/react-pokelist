import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

export default function Spinner({classess="", size="2xl"}) {
    return (
        <FontAwesomeIcon icon={faGear} spin size={size} className={classess || ""} />
    );
}