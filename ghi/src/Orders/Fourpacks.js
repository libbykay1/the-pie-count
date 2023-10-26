import React, { useState, useEffect } from 'react';

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
        <>
            <table>
                <tbody>
                    {orders
                        .filter(order => order.items.some(item => item.flavors))
                        .map(order => {
                            const url = `http://localhost:3000/${order._id}`;
                            return order.items
                                .filter(item => item.flavors)
                                .map(item => (
                                    <tr key={item._id}>
                                        <td>
                                            <a href={url}>{order.name}</a>
                                        </td>
                                        <td>
                                            {item.flavors}
                                        </td>
                                        <td>x{item.amount}</td>
                                    </tr>
                                ));
                        })}
                </tbody>
            </table>
            <table>
                <tbody>
                    {counts.map(flavor => {
                        return (
                            <tr key={flavor._id}>
                                <td>{flavor._id}</td>
                                <td>{flavor.count}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
                    }

export default Fourpacks;
