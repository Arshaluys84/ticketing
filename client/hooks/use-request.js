import React, { useState } from "react";
import axios from "axios";

export default function useRequest() {
  const [errors, setErrors] = useState([]);

  const doRequest = async (url, method, body, onSuccess) => {
    try {
      setErrors([]);
      const response = await axios[method](url, body);
      if (response.data && onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      setErrors(error.response?.data.errors);
    }
  };
  return {
    errors,
    doRequest,
  };
}
