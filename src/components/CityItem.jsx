import styles from './CityItem.module.css';

function CityItem({ city: { cityName, emoji, date } }) {
    const formatDate = (date) =>
        new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date(date));

    return (
        <li className={styles.cityItem}>
            <span className={styles.emoji}>{emoji}</span>
            <h3 className='name'>{cityName}</h3>
            <time className={styles.date}>{formatDate(date)}</time>
        </li>
    );
}

export default CityItem;
