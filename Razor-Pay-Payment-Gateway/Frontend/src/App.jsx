import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  

  // post request to backend 

  
  //console.log(data)
  
  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
      );
      const data= await  fetch("http://localhost:8080/rozorpay" ,{method:"POST"}).then((t)=>t.json())

    if (!res) {
      alert("Your Are Offiline");
      return;
    }
    var options = {
      key: "rzp_test_TSShg9kZXWwMxW", // Enter the Key ID generated from the Dashboard
      amount:data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
      currency:data.currency,
      name: "Payment Page",
      description: "Ecommerce",
      image: "image",
      order_id:data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response){
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature)
      },
      prefill: {
        name: "Dhananjay",
        email: "dhananajay@1234gmail.com",
        contact:"8788921998",
      },

      theme: {
        color: "#3399cc",
      },
    };
    var rzp = new window.Razorpay(options);
    rzp.open();
  };


  return (
    <div className="App">
     <button onClick={displayRazorpay}>PAY NOW</button>
    </div>
  )
}

export default App
