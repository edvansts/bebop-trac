import axios from "axios";
import { API_URL } from "../static/constants";

const api = axios.create({ baseURL: API_URL });

export default api;
