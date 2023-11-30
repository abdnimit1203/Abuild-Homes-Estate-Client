import PropTypes from "prop-types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ paymentData }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
  // console.log(paymentData);
  const {
    offeredAmount,
    propertyTitle,
    propertyLocation,
    propertyImage,
    agentName,
    agentEmail,
    buyerName,
    buyerEmail,

    _id,
  } = paymentData;

  useEffect(() => {
    if (offeredAmount > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: offeredAmount })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, offeredAmount]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error?.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("Payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // saving payment info in Database

        const payment = {
          propertyLocation,
          propertyTitle,
          propertyImage,
          agentName,
          agentEmail,
          buyerName,
          buyerEmail,
          date: new Date().getTime(),
          soldPrice: offeredAmount,
          offersId: _id,
          transactionId: paymentIntent.id,
        };
        const res = await axiosSecure.post("/api/v1/payments", payment);
        console.log(res);

        Swal.fire({
          title: "Payment Success!",
          text: `Amount: $${paymentIntent.amount / 100}\n\n Transaction Id:$${
            paymentIntent.id
          }`,
          icon: "success",
        });
        navigate('/dashboard/property-bought')
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col py-10">
        <CardElement
          className="border rounded-2xl py-10 bg-slate-200"
          options={{
            style: {
              base: {
                fontSize: "20px",
                color: "#424770",
                "::placeholder": {
                  color: "black",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <button
          type="submit"
          className="btn btn-success text-white my-10 btn-wide"
          disabled={!stripe}
        >
          Pay
        </button>
        {transactionId && (
          <p className="text-xl text-success fontbold">
            Transaction Id: {transactionId}
          </p>
        )}
        <p className="text-error">{error}</p>
      </form>
    </div>
  );
};
CheckoutForm.propTypes = {
  paymentData: PropTypes.object.isRequired,
};
export default CheckoutForm;
