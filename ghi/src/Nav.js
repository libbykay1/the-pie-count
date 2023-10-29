import { NavLink } from 'react-router-dom';
import styles from './nav.module.css';

function Nav() {
    return (
        <>
        <ul className={styles.navbarlist}>
            <li className={styles.navitem}>
                <NavLink className={styles.links} to="/neworder/">New Order</NavLink>
            </li>
            <li className={styles.navitem}>
                <NavLink className={styles.links} to="/orders/2023-11-20T00:00:00.000Z">Monday</NavLink>
            </li>
            <li className={styles.navitem}>
                <NavLink className={styles.links} to="/orders/2023-11-21T00:00:00.000Z">Tuesday</NavLink>
            </li>
            <li className={styles.navitem}>
                <NavLink className={styles.links} to="/orders/2023-11-22T00:00:00.000Z">Wednesday</NavLink>
            </li>
            <li className={styles.navitem}>
                <NavLink className={styles.links} to="/count">Count</NavLink>
            </li>
            <li className={styles.navitem}>
                <NavLink className={styles.links} to="/fourpacks">Fourpacks</NavLink>
            </li>
        </ul>
        </>
    )
}

export default Nav;
