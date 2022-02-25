module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  // format_date: date => {
  //   return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  // }
};


