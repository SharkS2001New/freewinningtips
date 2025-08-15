const getMinMaxDates = (data) => {
  if (data.length === 0) {
    // Return some default values or a message indicating no data
    return {
      minDate: 'No data available',
      maxDate: 'No data available',
    };
  }

  let minDate = new Date(data[0].date);
  let maxDate = new Date(data[0].date);

  data.forEach((item) => {
    const currentDate = new Date(item.date);
    if (currentDate < minDate) {
      minDate = currentDate;
    }
    if (currentDate > maxDate) {
      maxDate = currentDate;
    }
  });

  return {
    minDate: minDate.toLocaleString(),
    maxDate: maxDate.toLocaleString(),
  };
};

export default getMinMaxDates;
