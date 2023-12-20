import React from "react";
import Main from "./components/home/Main";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


function App() {
const stripePromise = loadStripe("your_stripe_publishable_key");

  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <Main />
      </Elements>
    </div>
  );
}

export default App;
