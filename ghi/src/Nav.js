import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <>
        <ul>
            <li>
                <NavLink to="/neworder/">New Order</NavLink>
            </li>
            <li>
                <NavLink to="/orders/2023-11-20T00:00:00.000Z">Monday</NavLink>
            </li>
            <li>
                <NavLink to="/orders/2023-11-21T00:00:00.000Z">Tuesday</NavLink>
            </li>
            <li>
                <NavLink to="/orders/2023-11-22T00:00:00.000Z">Wednesday</NavLink>
            </li>
            <li>
                <NavLink to="/count">Count</NavLink>
            </li>
            <li>
                <NavLink to="/fourpacks">Fourpacks</NavLink>
            </li>
        </ul>
        </>
    )
}

export default Nav;
