import http from "k6/http";

export const options = {
  vus: 1,
  duration: "10s",
};

export default () => {
  http.get("http://3.145.16.17/");
};
