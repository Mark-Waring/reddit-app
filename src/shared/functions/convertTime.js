export default function convertTime(time) {
  let displayedTime;
  function pluralize(display) {
    return display > 1 ? "s" : "";
  }
  if (time > 60 * 60 * 24 * 30 * 365) {
    displayedTime = Math.floor(time / (60 * 24 * 30 * 365));
    return `${displayedTime} year${pluralize(displayedTime)} ago`;
  } else if (time > 60 * 60 * 24 * 30) {
    displayedTime = Math.floor(time / (60 * 24 * 30));
    return `${displayedTime} month${pluralize(displayedTime)} ago`;
  } else if (time > 60 * 24) {
    displayedTime = Math.floor(time / (60 * 24));
    return `${displayedTime} day${pluralize(displayedTime)} ago`;
  } else if (time > 60) {
    displayedTime = Math.floor(time / 60);
    return `${displayedTime} hour${pluralize(displayedTime)} ago`;
  }
  if (time < 2) {
    return "1 minute ago";
  } else return `${time} minutes ago.`;
}
