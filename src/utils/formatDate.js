
import i18n from '../../i18n';







function formatDate(dateString, formattedWithTime) {
    let date = new Date(dateString);
  
    // Default to "en-US" if i18n.language is not set
    let locale = i18n.language || "en-US";
  
    // Adjust locale if necessary
    if (locale === "sr") {
      locale = "sr-Latn"; // Serbian Latin script
    }


    // Time format options (HH:mm)
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    
    // Format options
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  

    if(formattedWithTime){
    const timeString = date.toLocaleTimeString(locale, timeOptions);
    const dateStringFormatted = date.toLocaleDateString(locale, dateOptions);


    return `(${timeString} ${dateStringFormatted})`


}


  
    return date.toLocaleDateString(locale, dateOptions);
  }

export default formatDate;