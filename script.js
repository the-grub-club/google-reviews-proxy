import http from "k6/http";
import { check, sleep } from "k6";

let desiredRPS = 200; // total RPS for the test

// maximum requests executed by one VU per second, determined by experimentation.
// You can adjust this up/down depending on the performance of system you are testing.
let RPSperVU = 1;

let VUsRequired = Math.round(desiredRPS/RPSperVU);

export let options = {
  vus: VUsRequired,
  duration: '5m',
};

export default function() {
  let iterationStart = new Date().getTime(); // timestamp in ms
  let highTrafficNum = (Math.random()*(8000000-6000000+1)+6000000); //Number from a range of 2 million(6,000,000-8,000,000)
  let randomNum = Math.random();
  let id = (randomNum <= 0.8) ? reviewArr[Math.floor(randomNum * 3)] : Math.floor(randomNum * 10000000);
  let res = http.get('http://127.0.0.1:1000/restaurants/'+ id);
  check(res, {
    "success": (r) => r.status == 200
  });
  let iterationDuration = (new Date().getTime() - iterationStart) / 1000;
  let sleepTime = 1 - iterationDuration;  // 1 second minus time spent on request execution

  if (sleepTime > 0){
    sleep(sleepTime);
  }

};