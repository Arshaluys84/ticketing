import { useEffect, useState } from "react";
import Router from "next/router";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";

const OrderDetails = ({ currentUser, order }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest();

  useEffect(() => {
    const calcTime = () => {
      const leftTime = (new Date(order.expiresAt) - new Date()) / 1000;
      setTimeLeft(leftTime.toFixed(0));
    };
    calcTime();
    const timeId = setInterval(calcTime, 1000);

    return () => {
      clearInterval(timeId);
    };
  }, []);

  if (timeLeft < 0 || timeLeft === -0) {
    return <div>Your Order Expired</div>;
  }
  return (
    <>
      <h2>Your Order Will expire after seconds {timeLeft}</h2>
      <StripeCheckout
        token={({ id }) =>
          doRequest(
            "/api/payments",
            "post",
            { orderId: order.id, token: id },
            () => Router.push("/orders")
          )
        }
        stripeKey="pk_test_51N5OyaDnKfCifF6LKvGwJuGvTX5nIwJf4iPjmgc0KNbQyWdwF7C2mnZTDTCGvkF8dt1gyaLA2CZPUOSC5IKaXqml007SxoLADv"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
    </>
  );
};

OrderDetails.getInitialProps = async (context, client) => {
  const { orderId } = context.query;

  const { data } = await client.get(`/api/orders/${orderId}`);

  return {
    order: data,
  };
};

export default OrderDetails;
