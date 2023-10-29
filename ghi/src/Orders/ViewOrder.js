import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import styles from './orders.module.css';

function ViewOrder() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [date, setDate] = useState('');
    const [dateObject, setDateObject] = useState('');
    const [time, setTime] = useState('');
    const [collect, setCollect] = useState('');
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState('');

    const fetchOrder = async () => {
        const url = `http://localhost:8080/orders/${id}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const rawDate = data.pickupDate;
            const dt = DateTime.fromISO(rawDate, {zone: 'utc'});
            const formatted = dt.setZone('utc').toFormat('ccc M/d');
            setName(data.name);
            setDateObject(rawDate);
            setDate(formatted);
            setTime(data.displayTime);
            setItems(data.items);
            setNumber(data.number);
            setCollect(data.collect);
            setStatus(data.status);
        };
    };

    const orderReady = async () => {
        const url = `http://localhost:8080/orders/${id}/ready`;
        const fetchConfig = {
            method: 'PATCH'
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            fetchOrder();
        };
    };

    const orderPickedup = async () => {
        const url = `http://localhost:8080/orders/${id}/pickedup`;
        const fetchConfig = {
            method: 'PATCH'
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            fetchOrder();
            navigate(`/orders/${dateObject}`);
        };
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <div className={styles.newordercontainer}>
        <h1>{name}</h1>
        <div className={styles.orderinfo}>
        {number != null && (<div>
            Phone # / Shopify order #: {number}</div>)}
        </div>
        <div>
        {collect != null && collect != 'paid' &&(<div className={styles.bold}>
            Collect ${collect}</div>)}
        {collect == 'paid' &&(<div className={styles.bold}>
            Paid</div>)}
        </div>
        <div className={styles.orderinfo}>
            Pickup: {date}, {time}
        </div>
        <div>
                <table className={styles.table}>
                    <tbody>
                        {items.map(item => {
                            return (
                                <tr key={item._id}>
                                    <td className={styles.itemstabledata}> {item.amount}x</td>
                                    <td className={styles.itemstabledata}>{item.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {status == 'pending' && (
            <div>
                <button className={styles.button} onClick={orderReady}>Ready?</button>
                <button className={styles.button} onClick={orderPickedup}>Picked up ✓</button>
            </div>
            )}
                        {status == 'ready' && (
            <div>
                <button onClick={orderPickedup}>Picked up ✓</button>
            </div>
            )}
                        {status == 'picked up' && (
            <div>
                Picked up ✓
            </div>
            )}
            <div>
                <a className={styles.links} href={`http://localhost:3000/${id}/edit`}>Edit order</a>
            </div>
        </div>
    )
};

export default ViewOrder;
