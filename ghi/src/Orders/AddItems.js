import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { DateTime } from 'luxon';

function AddItems() {
    const largeRef = useRef();
    const doubleRef = useRef();
    const smallRef = useRef();
    const brittleRef = useRef();
    const cookieRef = useRef();
    const timeRef = useRef();
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemAmount, setItemAmount] = useState('');
    const [itemId, setItemId] = useState('');
    const [largePies, setLargePies] = useState([]);
    const [doubleCrusts, setDoubleCrusts] = useState([]);
    const [brittles, setBrittles] = useState([]);
    const [cookies, setCookies] = useState([]);
    const [savorys, setSavorys] = useState([]);
    const [sweets, setSweets] = useState([]);
    const [firstFlavor, setFirstFlavor] = useState('');
    const [secondFlavor, setSecondFlavor] = useState('');
    const [thirdFlavor, setThirdFlavor] = useState('');
    const [fourthFlavor, setFourthFlavor] = useState('');
    const [costTotal, setCostTotal] = useState('');
    const [collect, setCollect] = useState('');
    const [collectSaved, setCollectSaved] = useState(false);
    const [other, setOther] = useState('');
    const [customName, setCustomeName] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const { id } = useParams();

    const handleCustomNameChange = event => {
        setCustomeName(event.target.value);
    };

    const handleCustomAmountChange = event => {
        setCustomAmount(event.target.value);
    };

    const handleNewDateChange = event => {
        setNewDate(event.target.value);
    };

    const handleNewTimeChange = event => {
        setNewTime(event.target.value);
    };

    const handleItemNameChange = event => {
        setItemName(event.target.value);
    };

    const handleFirstFlavorChange = event => {
        setFirstFlavor(event.target.value);
    };

    const handleSecondFlavorChange = event => {
        setSecondFlavor(event.target.value);
    };

    const handleThirdFlavorChange = event => {
        setThirdFlavor(event.target.value);
    };

    const handleFourthFlavorChange = event => {
        setFourthFlavor(event.target.value);
    };

    const handleAmountChange = (event, itemId) => {
        const newAmount = event.target.value;
        setItemAmount(newAmount);
        setItemId(itemId);

        const updatedItems = items.map(item => {
            if (item._id === itemId) {
                return { ...item, amount: newAmount };
            }
            return item;
        });

        setItems(updatedItems);
    };

    const handleCollectChange = (event) => {
        setCollect(event.target.value);
    };

    const editAmount = async () => {
        const url = `http://localhost:8080/orders/${id}/items/${itemId}`;
        const data = {'amount': itemAmount};
        const fetchConfig = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            fetchOrder();
            fetchOrderTotal();
        };
    };

    const fetchOrder = async () => {
        const url = `http://localhost:8080/orders/${id}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const rawDate = data.pickupDate;
            const dt = DateTime.fromISO(rawDate, {zone: 'utc'});
            const formatted = dt.setZone('utc').toFormat('ccc M/d');
            setName(data.name);
            setDate(formatted);
            setTime(data.displayTime);
            setItems(data.items);
        };
    };

    const fetchOrderTotal = async () => {
        const url = `http://localhost:8080/orders/${id}/total`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setCostTotal(data.total);
        };
    };

    const fetchLargePies = async () => {
        const url = 'http://localhost:8080/large';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setLargePies(data);
        };
    };

    const fetchDoubleCrusts = async () => {
        const url = 'http://localhost:8080/double';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setDoubleCrusts(data);
        };
    };

    const fetchSavorys = async () => {
        const url = 'http://localhost:8080/savory';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSavorys(data);
        };
    };

    const fetchSweets = async () => {
        const url = 'http://localhost:8080/sweet';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSweets(data);
        };
    };

    const fetchBrittles = async () => {
        const url = 'http://localhost:8080/brittles';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setBrittles(data);
        };
    };

    const fetchCookies = async () => {
        const url = 'http://localhost:8080/cookies';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setCookies(data);
        };
    };

    const addCustom = async event => {
        event.preventDefault();
        const data = {}
        data.name = customName;
        data.amount = 1;
        data.price = customAmount;
        const url = `http://localhost:8080/orders/${id}/items`;
        const fetchConfig = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            fetchOrder();
            fetchOrderTotal();
            setCustomAmount('');
            setCustomeName('');
        };
    };

    const quickAddPumpkin = async event => {
        event.preventDefault();
        const data = {'name': 'Pumpkin', 'amount': 1, 'price': 22};
        const url = `http://localhost:8080/orders/${id}/items`;
        const fetchConfig = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            fetchOrder();
            fetchOrderTotal();
        };

    };

    const quickAddApple = async event => {
        event.preventDefault();
        const data = {'name': 'Cinnamon Apple', 'amount': 1, 'price': 22};
        const url = `http://localhost:8080/orders/${id}/items`;
        const fetchConfig = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            fetchOrder();
            fetchOrderTotal();
        };

    };

    const addLargePie = async event => {
        event.preventDefault();
        const selectedOption = largeRef.current.options[largeRef.current.selectedIndex];
        const itemName = selectedOption.value;
        const itemPrice = selectedOption.dataset.price;
        const data = {'name': itemName, 'amount': 1, 'price': itemPrice};
        const url = `http://localhost:8080/orders/${id}/items`;
        const fetchConfig = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            fetchOrder();
            fetchOrderTotal();
            largeRef.current.value = '';
        };

    };

    const addDoubleCrust = async event => {
        event.preventDefault();
        const selectedOption = doubleRef.current.options[doubleRef.current.selectedIndex];
        const itemName = selectedOption.value;
        const itemPrice = selectedOption.dataset.price;
        const data = {'name': itemName, 'amount': 1, 'price': itemPrice};
        const url = `http://localhost:8080/orders/${id}/items`;
        const fetchConfig = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            fetchOrder();
            fetchOrderTotal();
            doubleRef.current.value = '';
            cookieRef.current.value = '';
        };

    };

    const addBrittle = async event => {
        event.preventDefault();
        const selectedOption = brittleRef.current.options[brittleRef.current.selectedIndex];
        const itemName = selectedOption.value;
        const itemPrice = selectedOption.dataset.price;
        const data = {'name': itemName, 'amount': 1, 'price': itemPrice};
        const url = `http://localhost:8080/orders/${id}/items`;
        const fetchConfig = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            fetchOrder();
            fetchOrderTotal();
            brittleRef.current.value = '';
        };

    };

    const addCookie = async event => {
        event.preventDefault();
        const selectedOption = cookieRef.current.options[cookieRef.current.selectedIndex];
        const itemName = selectedOption.value;
        const itemPrice = selectedOption.dataset.price;
        const data = {'name': itemName, 'amount': 1, 'price': itemPrice};
        const url = `http://localhost:8080/orders/${id}/items`;
        const fetchConfig = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            fetchOrder();
            fetchOrderTotal();
            cookieRef.current.value = '';
        };

    };

    const createFourpack = async event => {
        event.preventDefault();
        const data = {'name': 'Fourpack', 'flavors': `${firstFlavor}, ${secondFlavor}, ${thirdFlavor}, ${fourthFlavor}`, 'price': 32, 'amount': 1};
        const url = `http://localhost:8080/orders/${id}/items`;
        const fetchConfig = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            fetchOrder();
            fetchOrderTotal();
        }

    };

    const addSmallPie = async event => {
        event.preventDefault();
        const data = {'name': `small ${itemName}`, 'amount': 1, 'price': 8};
        const url = `http://localhost:8080/orders/${id}/items`;
        const fetchConfig = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            fetchOrder();
            fetchOrderTotal();
            smallRef.current.value = '';
        };
    };

    const setOtherAmount = event => {
        setOther(event.target.value);
    };

    const editDateTime = async event => {
        event.preventDefault();
        const selectedOption = timeRef.current.options[timeRef.current.selectedIndex];
        const newDisplayTime = selectedOption.dataset.display;
        const data = {};
        data.pickupDate = newDate;
        data.pickupTime = newTime;
        data.displayTime = newDisplayTime;
        const url = `http://localhost:8080/orders/${id}`;
        const fetchConfig = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            fetchOrder();
        };
    };

    const editCollect = async event => {
        event.preventDefault();
        const url = `http://localhost:8080/orders/${id}/collect`;
        const data = {};
        if (collect == 'otherAmount') {
            data.collect = other;
        } else {
        data.collect = collect;
        };
        console.log(data);
        const fetchConfig = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setCollectSaved(true);
        };
    };

    const removeItem = async (itemId) => {
        const url = `http://localhost:8080/orders/${id}/items/${itemId}/remove`;
        const fetchConfig = {
            method: 'PATCH'
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            fetchOrder();
            fetchOrderTotal();
        };
    };

    useEffect(() => {
        fetchOrder();
        fetchOrderTotal();
        fetchLargePies();
        fetchDoubleCrusts();
        fetchSavorys();
        fetchSweets();
        fetchBrittles();
        fetchCookies();
    }, []);

    return (
        <>
        <h1>{name}</h1>
        <div>
            {date}, {time}
            <Popup trigger={<button>Edit</button>} position="right center">
                <form onSubmit={editDateTime} id='edit-order'>
                <label htmlFor="pickup-date">Pickup date</label>
            <input required value={newDate} onChange={handleNewDateChange} type="date" id="pickup-date" />
            <label htmlFor="pickup-time">Pickup time</label>
            <select ref={timeRef} onChange={handleNewTimeChange} id="pickup-time">
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
            </Popup>
        </div>
        <div>
            Quick add:
            <button onClick={quickAddPumpkin}>Large Pumpkin</button>
            <button onClick={quickAddApple}>Large Cinnamon Apple</button>
        </div>
        <div>
        <label htmlFor="large-pies">Add large pie: </label>
            <select ref={largeRef} id="large-pies" onChange={handleItemNameChange}>
                <option value=''>Choose a flavor</option>
                {largePies.map(pie => {
                    return (
                        <option key={pie._id} value={pie.name} data-price={pie.price}>
                            {pie.name}
                        </option>
                    );
                })};
            </select>
            <button onClick={addLargePie}>Add</button>

            </div>
            <div>
            <label htmlFor="double-crusts">Add double-crust pie: </label>
            <select ref={doubleRef} id="double-crusts" onChange={handleItemNameChange}>
                <option value=''>Choose a flavor</option>
                {doubleCrusts.map(pie => {
                    return (
                        <option key={pie._id} value={pie.name} data-price={pie.price}>
                            {pie.name}
                        </option>
                    );
                })};
            </select>
            <button onClick={addDoubleCrust}>Add</button>
            </div>
            <div>
                <form onSubmit={createFourpack} id='fourpack-form'>
                    Add fourpack:
                    <label htmlFor="first-flavor"></label>
            <select ref={smallRef} id="first-flavor" onChange={handleFirstFlavorChange}>
                <option value=''>First flavor</option>
                {savorys.map(pie => {
                    return (
                        <option key={pie._id} value={pie.name}>
                            {pie.name}
                        </option>
                    );
                })};
                {sweets.map(pie => {
                    return (
                        <option key={pie._id} value={pie.name}>
                            {pie.name}
                        </option>
                    )
                })}
            </select>
            <label htmlFor="second-flavor"></label>
            <select ref={smallRef} id="second-flavor" onChange={handleSecondFlavorChange}>
                <option value=''>Second flavor</option>
                {savorys.map(pie => {
                    return (
                        <option key={pie._id} value={pie.name}>
                            {pie.name}
                        </option>
                    );
                })};
                {sweets.map(pie => {
                    return (
                        <option key={pie._id} value={pie.name}>
                            {pie.name}
                        </option>
                    )
                })}
            </select>
            <label htmlFor="third-flavor"></label>
            <select ref={smallRef} id="third-flavor" onChange={handleThirdFlavorChange}>
                <option value=''>Third flavor</option>
                {savorys.map(pie => {
                    return (
                        <option key={pie._id} value={pie.name}>
                            {pie.name}
                        </option>
                    );
                })};
                {sweets.map(pie => {
                    return (
                        <option key={pie._id} value={pie.name}>
                            {pie.name}
                        </option>
                    )
                })}
            </select>
            <label htmlFor="fourth-flavor"></label>
            <select ref={smallRef} id="fourth-flavor" onChange={handleFourthFlavorChange}>
                <option value=''>Fourth flavor</option>
                {savorys.map(pie => {
                    return (
                        <option key={pie._id} value={pie.name}>
                            {pie.name}
                        </option>
                    );
                })};
                {sweets.map(pie => {
                    return (
                        <option key={pie._id} value={pie.name}>
                            {pie.name}
                        </option>
                    )
                })}
            </select>
            <button>Add</button>
                </form>
            </div>
            <div>
            <label htmlFor="brittles">Add brittle: </label>
            <select ref={brittleRef} id="brittles" onChange={handleItemNameChange}>
                <option value=''>Choose a flavor</option>
                {brittles.map(brittle => {
                    return (
                        <option key={brittle._id} value={brittle.name} data-price={brittle.price}>
                            {brittle.name}
                        </option>
                    );
                })};
            </select>
            <button onClick={addBrittle}>Add</button>
            </div>
            <div>
            <label htmlFor="cookies">Add cookies: </label>
            <select ref={cookieRef} id="cookies" onChange={handleItemNameChange}>
                <option value=''>Choose a flavor</option>
                {cookies.map(cookie => {
                    return (
                        <option key={cookie._id} value={cookie.name} data-price={cookie.price}>
                            {cookie.name}
                        </option>
                    );
                })};
            </select>
            <button onClick={addCookie}>Add</button>
            </div>
            <div>
            <label htmlFor="small-pies">Add small pie: </label>
            <select ref={smallRef} id="small-pies" onChange={handleItemNameChange}>
                <option value=''>Choose a flavor</option>
                {savorys.map(pie => {
                    return (
                        <option key={pie._id} value={pie.name}>
                            {pie.name}
                        </option>
                    );
                })};
                {sweets.map(pie => {
                    return (
                        <option key={pie._id} value={pie.name}>
                            {pie.name}
                        </option>
                    )
                })}
            </select>
            <button onClick={addSmallPie}>Add</button>
            </div>
            <div>
                Add custom item:
                <form onSubmit={addCustom} id="add-custom">
                    <label htmlFor="custom-name"></label>
                    <input value={customName} onChange={handleCustomNameChange} placeholder="Name" id="custom-name" type="text" />
                    <label htmlFor="custom-amount"></label>
                    <input value={customAmount} onChange={handleCustomAmountChange} placeholder="Price" id="custom-amount" type="text" />
                    <button>Add</button>
                </form>
            </div>
            <div>
                <table>
                    <tbody>
                        {items.map(item => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>
                                        <input
                                            value={item.amount}
                                            onChange={(event) => handleAmountChange(event, item._id)}
                                            type="number"
                                            id="amount"
                                        />
                                        <button onClick={editAmount}>Update</button>
                                    </td>
                                    <td>${item.price * item.amount || item.price}</td>
                                    <td>
                                        <button onClick={() => removeItem(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td>${costTotal}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <form onSubmit={editCollect} id='collect-form'>
               <select onChange={handleCollectChange} id='collect'>
                <option value=''>Collect?</option>
                <option value={costTotal}>Collect ${costTotal}</option>
                <option value='otherAmount'>Collect other amount</option>
                <option value='paid'>Mark as paid</option>
               </select>
               {collect == 'otherAmount' && (
               <input onChange={setOtherAmount} type='text' placeholder="amount" id="other-amount"/>)}
               <button>Save</button>
               </form>
               {collectSaved && (
                <div>
                    Saved ✓
                    </div>
               )}
            </div>
        </>
    )
};

export default AddItems;
