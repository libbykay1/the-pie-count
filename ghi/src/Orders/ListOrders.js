import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import styles from './orders.module.css';

function ListOrders() {
    const { date } = useParams();
    const [orders, setOrders] = useState([]);


    const dt = DateTime.fromISO(date, {zone: 'utc'});
    const formattedDate = dt.setZone('utc').toFormat('ccc, M/d');

    const fetchOrders = async () => {
        const url = `http://localhost:8080/orders/list/${date}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setOrders(data);
        };
    };


    const deleteOrder = (orderId) => {
        const url = `http://localhost:8080/orders/${orderId}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
        if (response.ok) {
            fetchOrders();
            };
        });
    };

useEffect(() => {
    fetchOrders(date);
}, [date]);

return (
    <div className={styles.newordercontainer}>
    <h1>{formattedDate}</h1>
    <table className={styles.table}>
        <tbody>
            {orders.map(order => {
                const url = `http://localhost:3000/${order._id}`
                return (
                    <tr key={order._id}>
                        <td className={styles.orderstabledata}>
                            <a href={url}>{order.name}</a>
                        </td>
                        <td className={styles.orderstabledata}>
                            {order.displayTime}
                        </td>
                        <td className={styles.orderstabledata}>
                            {order.status}
                        </td>
                        <td className={styles.orderstabledata}>
                            <button onClick={() => deleteOrder(order._id)}>Delete</button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </table>
    </div>
)

};

export default ListOrders;
