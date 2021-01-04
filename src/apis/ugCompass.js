import axios from 'axios';

export default axios.create({
  baseURL: 'https://ugcompass.herokuapp.com/api/v1',
});
