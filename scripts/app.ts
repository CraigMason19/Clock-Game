import { Clock } from './clock.js';
import { TIME_ZONES } from './timeZones.js';


const c1 = new Clock("clock-one");
const c2 = new Clock("clock-two", "America/New_York");
const c3 = new Clock("clock-three", 'Europe/Paris');

c1.animateClock();
c2.animateClock();
c3.animateClock();



