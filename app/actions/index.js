import axios from "axios";

const API_KEY = "AIzaSyBw6VF7mra0jufF209HhB-83lJBE4_uibk";
const ROOT_URL = `https://www.googleapis.com/books/v1/volumes?key=${API_KEY}`;

export const FETCH_BOOKS = "FETCH_BOOKS";



export function fetchBooks(queryString) {
    console.log("action", queryString)
    //?q=deep learning+inauthor:goodfellow&
    const url = `${ROOT_URL}&q=${queryString}`;
    const request = axios.get(url)// .then(response => response.data.items);
    
    return {
        type: FETCH_BOOKS,
        payload: request
    };
    
}
