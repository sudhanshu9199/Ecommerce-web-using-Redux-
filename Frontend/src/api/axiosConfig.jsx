import axios from 'axios';

const initial = axios.create({
    baseURL: 'http://localhost:3000/',
})
export default initial;