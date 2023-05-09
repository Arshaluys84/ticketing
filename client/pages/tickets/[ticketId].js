import Router from "next/router";
import useRequest from "../../hooks/use-request";

const TicketDetails = ({ ticketDetails }) => {
  const { doRequest, errors } = useRequest();

  const handleOnClick = () => {
    doRequest(
      "/api/orders",
      "post",
      {
        ticketId: ticketDetails.id,
      },
      (order) => Router.push("/orders/[orderId]", `/orders/${order.id}`)
    );
  };
  return (
    <>
      <h1>Ticket Details</h1>
      <h2>{ticketDetails.title}</h2>
      <h3>Price: {ticketDetails.price}</h3>
      {errors.length > 0 && !errors[0].field && (
        <div className="alert alert-danger">{errors[0].message}</div>
      )}
      <button className="btn btn-primary" onClick={handleOnClick}>
        BUY
      </button>
    </>
  );
};

TicketDetails.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;

  const { data } = await client.get(`/api/tickets/${ticketId}`);

  console.log(data, "ticketId");

  return {
    ticketDetails: data,
  };
};

export default TicketDetails;
