let currentTime = Date.now();
const timeleft = +deadLine - currentTime;
console.log(timeleft);
let years = Math.floor(timeleft / (1000 * 60 * 60 * 24 * 365));
let months = Math.floor(timeleft / (1000 * 60 * 60 * 24 * 30));
let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
console.log(years, months, days, hours);

// Для двух дат используйте следующий код для вычисления их разницы в миллисекундах,
// затем в секундах, минутах, часах, днях и месяцах:
var currentDate = new Date();
var eventDate = new Date(2016, 3, 6); // months start from 0
var milliseconds = eventDate.getTime() - currentDate.getTime();
var seconds = parseInt(milliseconds / 1000);
var minutes = parseInt(seconds / 60);
var hours = parseInt(minutes / 60);
var days = parseInt(hours / 24);
var months = parseInt(days / 30);
seconds -= minutes * 60;
minutes -= hours * 60;
hours -= days * 24;
days -= months * 30;
