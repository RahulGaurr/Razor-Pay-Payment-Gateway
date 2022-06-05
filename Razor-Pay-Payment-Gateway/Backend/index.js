
const express =  require("express")
const app = express()

const cors = require("cors")
const ngrok = require('ngrok');
(async function() {
  const url = await ngrok.connect();
  console.log(url)
})();

app.use(cors())
const shortId= require("shortid")

const Razorpay = require ("razorpay")

var instance = new Razorpay({  key_id: 'rzp_test_TSShg9kZXWwMxW',  key_secret: '7ZxgkGP6rnRSdN4FLmQGAruR',});

app.listen(80,()=>{
    console.log("listing on port")
})


app.post("/rozorpay",async(req,res)=>{
    
    const amount= 500;
 

    const option={
        amount:amount*100,
        currency: "INR",
        receipt: shortId.generate(),
        payment_capture:1
        // payment: {
        //   "capture ": "automatic",
        //   "capture_options ": {
        //     "automatic_expiry_period ": 12,
        //     "manual_expiry_period ": 7200,
        //     "refund_speed": "optimum"
        //   }  
        // }
      }
  try{

      const responce= await instance.orders.create(option)
      console.log(responce)
      res.json({
        id:responce.id,
        currency: responce.currency,
        amount: responce.amount,
        receipt:responce.receipt
      })
  }
  catch(e){
      console.log(e.message)
  }
      
})