import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';

// Iterated as part of /cities url
function CityItem({ city: { cityName, emoji, date, id, position: { lat, lng } } }) {
    const formatDate = (date) =>
        new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date(date));

    return (
        <li >
            <Link to={`${id}?lat=${lat}&lng=${lng}`} className={styles.cityItem}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
            </Link>
        </li>
    );
}

export default CityItem;
