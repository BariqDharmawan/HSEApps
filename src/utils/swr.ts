import axios from 'axios';

const fetcher = (url: string) => axios.get(`https://jsonplaceholder.typicode.com/${url}`).then((res) => res.data);

export default fetcher;
