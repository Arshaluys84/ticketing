import React, { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";
import { checkErrorWithField } from "../../utils/checkErrorWithField";

export default function Signin() {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
  });

  const { errors, doRequest } = useRequest();

  // const checkErrorWithField = (field) => {
  //   if (errors.length) {
  //     const error = errors.find((err) => err.field === field);
  //     return error?.message;
  //   } else {
  //     return null;
  //   }
  // };

  const handleSignupChange = (e) => {
    setSignupData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSignupForm = async (e) => {
    e.preventDefault();

    const res = await doRequest(
      "/api/users/signin",
      "post",
      {
        email: signupData.email,
        password: signupData.password,
      },
      () => Router.push("/")
    );
    if (res) {
      setSignupData({
        email: "",
        password: "",
      });
    }
    // setSignupData(res);
  };
  return (
    <form onSubmit={handleSignupForm}>
      <div className="form-group">
        <label>Email</label>
        <input
          className="form-control"
          name="email"
          value={signupData.email}
          onChange={handleSignupChange}
        />
        {checkErrorWithField("email", errors) && (
          <div className="alert alert-danger">
            {checkErrorWithField("email", errors)}
          </div>
        )}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          className="form-control"
          type="password"
          name="password"
          value={signupData.password}
          onChange={handleSignupChange}
        />
        {checkErrorWithField("password", errors) && (
          <div className="alert alert-danger">
            {checkErrorWithField("password", errors)}
          </div>
        )}
      </div>
      {errors.length > 0 && !errors[0].field && (
        <div className="alert alert-danger">{errors[0].message}</div>
      )}
      <button className="btn btn-primary">Signin</button>
    </form>
  );
}
