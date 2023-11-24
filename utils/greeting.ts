const greeting = () => {
  const date = new Date();
  const hour = date.getHours();
  if (hour <= 12) return "Good Morning";
  if (hour <= 16) return "Good Afternoon";
  if (hour <= 23) return "Good Evening";
};

export { greeting };
