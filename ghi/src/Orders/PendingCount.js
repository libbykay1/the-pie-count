import React,  { useState, useEffect } from 'react';
import styles from './orders.module.css';

function PendingCount() {
    const [items, setItems] = useState([]);


    const fetchItems = async () => {
        const url = 'http://localhost:8080/orders/items/count';
        const response = await fetch(url);
        if(response.ok) {
            const data = await response.json();
            setItems(data);
        };
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className={styles.container}>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.tabledata}>Product</th>
                    <th className={styles.tabledata}>Count</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => {
                    return (
                        <tr key={item._id}>
                            <td className={styles.tabledata}>{item._id}</td>
                            <td className={styles.tabledata}>{item.count}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
    )

};

export default PendingCount;
