export function onTimeChange(timeSplit: string) {
  var hours, minutes, meridian;
  hours = Number(timeSplit[0]);
  minutes = Number(timeSplit[1]);
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

  return `${hours}:${minutes}:${meridian}`;
}
