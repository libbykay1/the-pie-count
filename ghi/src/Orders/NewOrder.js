import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './orders.module.css';

function NewOrder() {
    const timeRef = useRef();
    const inputRef = useRef();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const navigate = useNavigate();


    const handleNameChange = event => {
        setName(event.target.value);
    };

    const handleNumberChange = event => {
        setNumber(event.target.value);
    };

    const handlePickupDateChange = event => {
        setPickupDate(event.target.value);
    };

    const handlePickupTimeChange = event => {
        setPickupTime(event.target.value);
    };


    const handleSubmit = async event => {
        event.preventDefault();
        const selectedOption = timeRef.current.options[timeRef.current.selectedIndex];
        const timeDisplay = selectedOption.dataset.display;
        const data = {};
        data.name = name;
        data.number = number;
        data.status = 'pending';
        data.pickupDate = pickupDate;
        data.pickupTime = pickupTime;
        data.displayTime = timeDisplay;
        const url = 'http://localhost:8080/orders';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newOrder = await response.json();
            const newOrderId = newOrder._id;
            navigate(`/${newOrderId}/edit`)
        };
    };


    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div className={styles.newordercontainer}>
        <h1>New Order</h1>
        <form onSubmit={handleSubmit} id="new-order">
            <div className={styles.formfield}>
            <label htmlFor="name">Name:</label>
            <input className={styles.textinput} ref={inputRef} required value={name} onChange={handleNameChange} placeholder="" type="text" id="name" />
            </div>
            <div className={styles.formfield}>
            <label htmlFor="phone-number">Phone # / Shopify order #:</label>
            <input className={styles.textinput} value={number} onChange={handleNumberChange} placeholder="" type="text" id="phone-number" />
            </div>
            <div className={styles.formfield}>
            <label htmlFor="pickup-date">Pickup date</label>
            <input className={styles.textinput} required value={pickupDate} onChange={handlePickupDateChange} type="date" id="pickup-date" />
            </div>
            <label htmlFor="pickup-time">Pickup time</label>
            <select className={styles.textinput} ref={timeRef} onChange={handlePickupTimeChange} id="pickup-time">
                <option value=''>Choose pickup time</option>
                <option value='10:00' data-display='10 am'>10 am</option>
                <option value='10:15' data-display='10:15 am'>10:15 am</option>
                <option value='10:30' data-display='10:30 am'>10:30 am</option>
                <option value='10:45' data-display='10:45 am'>10:45 am</option>
                <option value='11:00' data-display='11 am'>11 am</option>
                <option value='11:15' data-display='11:15 am'>11:15 am</option>
                <option value='11:30' data-display='11:30 am'>11:30 am</option>
                <option value='11:45' data-display='11:45 am'>11:45 am</option>
                <option value='12:00' data-display='12 pm'>12 pm</option>
                <option value='12:15' data-display='12:15 pm'>12:15 pm</option>
                <option value='12:30' data-display='12:30 pm'>12:30 pm</option>
                <option value='12:45' data-display='12:45 pm'>12:45 pm</option>
                <option value='13:00' data-display='1 pm'>1 pm</option>
                <option value='13:15' data-display='1:15 pm'>1:15 pm</option>
                <option value='13:30' data-display='1:30 pm'>1:30 pm</option>
                <option value='13:45' data-display='1:45 pm'>1:45 pm</option>
                <option value='14:00' data-display='2 pm'>2 pm</option>
                <option value='14:15' data-display='2:15 pm'>2:15 pm</option>
                <option value='14:30' data-display='2:30 pm'>2:30 pm</option>
                <option value='14:45' data-display='2:45 pm'>2:45 pm</option>
                <option value='15:00' data-display='3 pm'>3 pm</option>
                <option value='15:15' data-display='3:15 pm'>3:15 pm</option>
                <option value='15:30' data-display='3:30 pm'>3:30 pm</option>
                <option value='15:45' data-display='3:45 pm'>3:45 pm</option>
                <option value='16:00' data-display='4 pm'>4 pm</option>
                <option value='16:15' data-display='4:15 pm'>4:15 pm</option>
                <option value='16:30' data-display='4:30 pm'>4:30 pm</option>
                <option value='16:45' data-display='4:45 pm'>4:45 pm</option>
                <option value='17:00' data-display='5 pm'>5 pm</option>
                </select>
            <button>Save</button>
        </form>
        </div>
    )
};

export default NewOrder;
