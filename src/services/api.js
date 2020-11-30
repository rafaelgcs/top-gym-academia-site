import axios from "axios";

const apiInsta = axios.create({
  baseURL: "https://graph.instagram.com"
});

const api = axios.create({
  baseUrl: "https://localhost:8080"
})

export { apiInsta, api };