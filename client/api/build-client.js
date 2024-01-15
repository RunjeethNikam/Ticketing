import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL:
        "http://runjeeth-nikam.site/",
      headers: req.headers,
    });
  } else {
    return axios.create();
  }
};
