export function onTimeChange(timeSplit: string) {
  const time = timeSplit.split(":")
  var hours, minutes, meridian;
  hours = Number(time[0]);
  minutes = Number(time[1]);
  if (hours > 12) {
    meridian = "PM";
    hours -= 12;
  } else if (hours < 12) {
    meridian = "AM";
    if (hours == 0) {
      hours = 12;
    }
  } else {
    meridian = "PM";
  }

  return `${hours}:${minutes} ${meridian}`;
}
