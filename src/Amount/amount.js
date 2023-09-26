import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './amount.css'

function Amount({senderName, receiverName}){
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();
    
    const handleAmount = (e) =>{
        const enteredAmount = e.target.value;
        setAmount(enteredAmount);
    }

    const handleAmountSent = async (e) => {
        let item = {amount, senderName, receiverName};

        try{
        const response = await fetch("http://localhost:3000/users/sendmoney",{
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(item)
        });

        if (response.ok) {
            console.log("success");
            
          } else {
            console.error("Error:", response.status);
          }
        } catch (error) {
          console.error("Error:", error);
        }

           setTimeout(() => {
            window.location.reload();
            navigate("/dashboard");
           }, 2000)

           
      };


    
    return (
        <div className="amount">
            <div className="amountInputs">
            <input 
            type="text"
            placeholder="enter amount"
            value={amount}
            onChange={handleAmount}  
            />  

             {amount && (<button className="sendIcon" onClick={handleAmountSent}>
            <i className="material-icons">send</i>
            </button> )} 
            
        </div> 
        </div>
    );
}


export default Amount;