import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../../components/Forms/CheckoutForm";
import { useLoaderData } from "react-router-dom";
import HeaderText from "../../../components/HeaderText/HeaderText";

// publishabl key

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
const Payment = () => {
  const paymentData = useLoaderData();
  console.log(paymentData);
  return (
    <div className="px-10 ">
      <HeaderText headerText="Make Payment" />
      <div className="space-y-3 bg-base-200 p-6 rounded-2xl">
        <h2 className="text-xl md:text-xl font-bold  mx-auto">
          Payment for:
          <span className="font-normal">{paymentData.propertyTitle}</span>{" "}
        </h2>
        <h2 className="text-xl md:text-xl font-bold  mx-auto">
          Payable Amount:
          <span className="font-normal">
            {" "}
            $ {paymentData.offeredAmount}
          </span>{" "}
        </h2>
      </div>

      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm paymentData={paymentData} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
