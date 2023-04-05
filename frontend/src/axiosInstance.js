import axios from "axios";

export default axios.create({
    baseURL: "https://menulize-backend.onrender.com",
    headers: {
        "Content-type": "application/json"
    }
});