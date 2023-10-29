import React, { useState, useEffect } from 'react';
import styles from './orders.module.css';

function Fourpacks() {
    const [orders, setOrders] = useState([]);
    const [counts, setCounts] = useState([]);

    const fetchOrders = async () => {
        const url = `http://localhost:8080/orders/`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setOrders(data);
        };
    };

    const fetchCounts = async () => {
        const url = 'http://localhost:8080/fourpacks/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setCounts(data);
        };
    };

    useEffect(() => {
        fetchOrders();
        fetchCounts();
    }, []);

    return (
        <div className={styles.container}>
            <div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.tabledata}>Order Name</th>
                        <th className={styles.tabledata}>Flavors</th>
                    </tr>
                </thead>
                <tbody>
                    {orders
                        .filter(order => order.items.some(item => item.flavors))
                        .map(order => {
                            const url = `http://localhost:3000/${order._id}`;
                            return order.items
                                .filter(item => item.flavors)
                                .map(item => (
                                    <tr key={item._id}>
                                        <td className={styles.tabledata}>
                                            <a href={url}>{order.name}</a>
                                        </td>
                                        <td className={styles.tabledata}>
                                            {item.amount}x {item.flavors}
                                        </td>
                                    </tr>
                                ));
                        })}
                </tbody>
            </table>
            </div>
            <div className={styles.rightcontainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.tabledata}>Flavor</th>
                        <th  className={styles.tabledata}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {counts.map(flavor => {
                        return (
                            <tr key={flavor._id}>
                                <td className={styles.tabledata}>{flavor._id}</td>
                                <td className={styles.tabledata}>{flavor.count}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        </div>
    );
                    }

export default Fourpacks;
