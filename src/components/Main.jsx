import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./main.css"

export default function Main() {
    const [users, setUsers] = useState([]);
    console.log(users);
    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((res) => setUsers(res.data))
            .catch(err => {
                console.log(err);
            });
    }, []);

    //payme
    const handleAddBayClick = () => {
        // Bunday joyda foydalanuvchini boshqa sahifaga yo'naltirishingiz mumkin
        // Masalan, window.location.href orqali.
        window.location.href = 'https://my.click.uz/services/pay?service_id=27844&merchant_id=17702&amount=735000&transaction_param=1702977370924&return_url=https://ubaytools.com/profile&card_type=uzcard';
    };
    return (
        <div className='main'>
            {
                users.slice(1, 2).map((item) => (
                    <div className="card">
                        <p>{item.name}</p>
                        <button onClick={handleAddBayClick}>add bay</button>
                    </div>
                ))
            }
        </div>
    )
}
