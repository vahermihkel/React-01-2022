import { useEffect, useState } from 'react';

function PaymentCompleted() {

  const [message, setMessage] = useState("Ootame kinnitust...");
  const payment_reference = window.location.href.split("payment_reference=")[1];

  useEffect(()=>{
    fetch("https://igw-demo.every-pay.com/api/v4/payments/" +
      payment_reference +
      "?api_username=92ddcfab96e34a5f", {
        headers: {
          "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=="
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.payment_state === "settled") {
          setMessage("Edukalt makstud!");
          const order_reference = window.location.href.split("order_reference=")[1];
          const orderId = order_reference.split("&")[0];
          console.log(orderId);
        } else if (
          data.payment_state === "failed" ||
          data.payment_state === "abandoned" ||
          data.payment_state === "voided"
        ) {
          setMessage("Makse ebaõnnestus");
        }
      })
  })

  return (<div>{ message }</div>)
}

export default PaymentCompleted;