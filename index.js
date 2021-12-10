const { EventEmitter } = require("events");

let [hour, date, month, year] = process.argv[2].split("-");
month -= 1;

const countDown = (year, month, date, hour) => {
  const eventEmitter = new EventEmitter();

  const deadLine = new Date(year, month, date, hour);

  // This will trigger the update event each passing second
  const secondsTimer = setInterval(() => {
    let currentTime = Date.now();
    let timeLeft = +deadLine - currentTime;
    let seconds = Math.floor(timeLeft / 1000);
    eventEmitter.emit("updateSeconds", seconds);
    if (seconds === 0) {
      clearInterval(secondsTimer);
      eventEmitter.emit("endSekonds");
    }
  }, 1000);

  const yearsTimer = setInterval(() => {
    let currentTime = Date.now();
    let timeLeft = +deadLine - currentTime;
    let years = Math.floor(timeLeft / (1000 * 60 * 60 * 24 * 365));
    eventEmitter.emit("updateYears", years);
    if (years === 0) {
      clearInterval(yearsTimer);
      eventEmitter.emit("endYears");
    }
  }, 1000);

  const monthsTimer = setInterval(() => {
    let currentTime = Date.now();
    let timeLeft = +deadLine - currentTime;
    let months = Math.floor(timeLeft / (1000 * 60 * 60 * 24 * 30));
    eventEmitter.emit("updateMonths", months);
    if (months === 0) {
      clearInterval(monthsTimer);
      eventEmitter.emit("endMonths");
    }
  }, 1000);

  const daysTimer = setInterval(() => {
    let currentTime = Date.now();
    let timeLeft = +deadLine - currentTime;
    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    eventEmitter.emit("updateDays", days);
    if (days === 0) {
      clearInterval(daysTimer);
      eventEmitter.emit("endDays");
    }
  }, 1000);

  const hoursTimer = setInterval(() => {
    let currentTime = Date.now();
    let timeLeft = +deadLine - currentTime;
    let hours = Math.floor(timeLeft / (1000 * 60 * 60));
    eventEmitter.emit("updateHours", hours);
    if (hours === 0) {
      clearInterval(hoursTimer);
      eventEmitter.emit("endHours");
    }
  }, 1000);

  return eventEmitter;
};

const myCountDown = countDown(year, month, date, hour);

myCountDown.on("updateSeconds", (t) => {
  console.log(`${t} seconds till deadline`);
});
myCountDown.on("endSeconds", () => {
  console.log("seconds timer off");
});

myCountDown.on("updateYears", (t) => {
  console.log(`${t} years till deadline`);
});
myCountDown.on("endYears", () => {
  console.log("years timer off");
});

myCountDown.on("updateMonths", (t) => {
  console.log(`${t} months till deadline`);
});
myCountDown.on("endMonths", () => {
  console.log("months timer off");
});

myCountDown.on("updateDays", (t) => {
  console.log(`${t} days till deadline`);
});
myCountDown.on("endDays", () => {
  console.log("days timer off");
});

myCountDown.on("updateHours", (t) => {
  console.log(`${t} hours till deadline`);
});
myCountDown.on("endHours", () => {
  console.log("hours timer off");
});

// console.log(myCountDown.eventNames());
