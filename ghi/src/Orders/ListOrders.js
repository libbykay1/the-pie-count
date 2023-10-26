import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

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
    <>
    <h1>{formattedDate}</h1>
    <table>
        <tbody>
            {orders.map(order => {
                const url = `http://localhost:3000/${order._id}`
                return (
                    <tr key={order._id}>
                        <td>
                            <a href={url}>{order.name}</a>
                        </td>
                        <td>
                            {order.displayTime}
                        </td>
                        <td>
                            {order.status}
                        </td>
                        <td>
                            <button onClick={() => deleteOrder(order._id)}>Delete</button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </table>
    </>
)

};

export default ListOrders;
