import Link from "next/link";

const Home = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link
            // href="/tickets/[ticketId]"
            href={`/tickets/${ticket.id}`}
            className="nav-link"
          >
            View
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>
        {currentUser ? `Welcome ${currentUser.email} ` : "You are Not signin"}
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

Home.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/tickets");

  return {
    tickets: data,
  };
  // const { data } = await buildClient({ req }).get("/api/users/currentuser");
  // if (typeof window === "undefined") {
  //   const { headers } = req;
  //   try {
  //     res = await axios.get(
  //       "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
  //       {
  //         headers,
  //       }
  //     );
  //     // console.log(res.data.currentUser, "2");
  //     // return res.data;
  //   } catch (error) {
  //     console.log(error.response, "3");
  //   }
  // } else {
  //   res = await axios.get("/api/users/currentuser");
  //   // console.log(res, "1");
  //   // return res.data;
  // }

  // return {
  //  user: data.currentUser,
  // };
};

export default Home;
