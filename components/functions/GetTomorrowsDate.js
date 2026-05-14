// components/functions/GetTomorrowsDate.js
function getTomorrowsDate() {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}

export default getTomorrowsDate;