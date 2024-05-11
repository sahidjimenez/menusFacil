import axios from 'axios';
    
export default axios.create({
 baseURL: "https://fresh-strapi-73a7518a11c9.herokuapp.com",
 headers: {
   "Content-type": "application/json",
 },
});