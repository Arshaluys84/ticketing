import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";
import { checkErrorWithField } from "../../utils/checkErrorWithField";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const { doRequest, errors } = useRequest();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    doRequest("/api/tickets", "post", { title, price }, () => Router.push("/"));
  };

  const handleOnBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) return;

    setPrice(value.toFixed(2));
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {checkErrorWithField("title", errors) && (
          <div className="alert alert-danger">
            {checkErrorWithField("title", errors)}
          </div>
        )}
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          className="form-control"
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          onBlur={handleOnBlur}
        />
        {checkErrorWithField("price", errors) && (
          <div className="alert alert-danger">
            {checkErrorWithField("price", errors)}
          </div>
        )}
      </div>
      {errors.length > 0 && !errors[0].field && (
        <div className="alert alert-danger">{errors[0].message}</div>
      )}
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default NewTicket;
