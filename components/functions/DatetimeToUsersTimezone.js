function DateTimeToUsersTimezone(original_date_given){
     //datetime converted to timezone of the user            
     const date =new Date(original_date_given);
     const serverTimeZone = "Europe/Berlin"; //servers timezone
     const usersTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; //get my current timezone //"Africa/Nairobi";

     const europe_berlin_hours = new Date(new Date().toLocaleString("en-US", { timeZone: serverTimeZone })).getHours(); //get hours from servers date
     const my_timezone_hours = new Date(new Date().toLocaleString("en-US", { timeZone: usersTimeZone })).getHours(); //get hours from my date in my timezone

     //compute difference in hours between time zones
     const time_in_hours_difference = my_timezone_hours - europe_berlin_hours; 

     //create new date by adding time difference
     date.setHours(date.getHours() + time_in_hours_difference);

     //convert date to my current timezone
     const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: usersTimeZone};
          
     const inputDateString = date.toLocaleString('en-US', options);

     //convert to format dd/mm/yyyy H:mm
     const inputDate = new Date(inputDateString);

     const options1 = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
          
     const myNewDateString = inputDate.toLocaleDateString('en-GB', options1).replace(',', '');

     return myNewDateString;
}

export default DateTimeToUsersTimezone;