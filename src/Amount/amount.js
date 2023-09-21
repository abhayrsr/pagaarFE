import React, { useState } from "react";

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
        </div> 
        </div>
    );
}

export default Amount;