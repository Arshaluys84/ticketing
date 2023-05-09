import axios from "axios";

export default function handler({ req }) {
  if (typeof window === "undefined") {
    const { headers } = req;
    const res = axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers,
    });
    return res;
  } else {
    const res = axios.create({
      baseURL: "/",
    });

    return res;
  }
}
