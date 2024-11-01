import axios from "axios";

const api = axios.create({
  baseURL: "https://marcconrad.com/uob/banana/doc.php",
});

export default api;
