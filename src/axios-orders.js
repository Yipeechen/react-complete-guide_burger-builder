import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-22313.firebaseio.com/'
});

export default instance;
