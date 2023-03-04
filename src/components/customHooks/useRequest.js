import axios from "axios";

module.exports.useAPIcall = async (url, method, body = {}) => {
  if ((url && url.length == 0) || (method && method.length == 0)) {
    return null;
  }
  method = method.toLowerCase();
  let response;
  switch (method) {
    case "get":
      response = await axios.get(url);
      break;
    case "post":
      response = await axios.post(url, body);
      break;
    default:
      break;
  }

  return response;
};
