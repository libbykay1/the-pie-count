import React,  { useState, useEffect } from 'react';

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
        <>
        <table>
            <tbody>
                {items.map(item => {
                    return (
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.count}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )

};

export default PendingCount;
