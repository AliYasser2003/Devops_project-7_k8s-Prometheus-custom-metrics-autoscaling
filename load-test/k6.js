import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100, // number of virtual users
  duration: '120s', // test duration
};

export default function () {
  http.get('http://localhost:3001');
  sleep(1);
}
