import Router from "next/router";
import { useEffect } from "react";
import useRequest from "../../hooks/use-request";

const Signout = () => {
  const { doRequest } = useRequest();
  useEffect(() => {
    doRequest("/api/users/signout", "post", {}, () => Router.push("/"));
  }, []);
  return <div>You are signing out....</div>;
};

export default Signout;
