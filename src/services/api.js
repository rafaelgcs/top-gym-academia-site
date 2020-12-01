import axios from "axios";
import { getToken } from './auth';

const URL = process.env.REACT_APP_URL_API;


const apiInsta = axios.create({
  baseURL: "https://graph.instagram.com"
});

const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});

const apiAuth = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${getToken()}`
  }
});

export { apiInsta, api, apiAuth };