import axios from "axios";
const URL = 'http://localhost:1337/api/quotes-collections'

export const getQuotes = ()=>{
    axios.get(URL);
} 

