function getFormattedCurrentDate() {
    try {
      // Declare current date
      const today = new Date();
      // Get the year, month, and day from the current date
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      // Format the date in "YYYY-MM-DD" format
      const formatted_date = `${year}-${month}-${day}`;
  
      return formatted_date;
    } catch (err) {
      console.log(err.message);
    }
}

export default getFormattedCurrentDate;