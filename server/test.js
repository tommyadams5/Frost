// const time = "1706400058750";
const time = Date.now();
console.log(typeof time);
const datetime = new Date(time);
const datetimeFormatted = new Intl.DateTimeFormat("en-US", {
  dateStyle: "short",
  timeStyle: "short",
}).format(datetime);
console.log(datetimeFormatted);
