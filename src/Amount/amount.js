import React, { useState } from "react";
import './amount.css'

function Amount(){
    const [amount, setAmount] = useState('');

    const handleAmount = (e) =>{
        const enteredAmount = e.target.value;
        setAmount(enteredAmount);
    }
    return (
        <div className="amount">
            <div className="amountInputs">
            <input 
            type="text"
            placeholder="enter amount"
            value={amount}
            onChange={handleAmount}
            />   
            {amount && (<button className="sendIcon">
            <i className="material-icons">send</i>
            </button> )}  
        </div> 
        </div>
    );
}

export default Amount;