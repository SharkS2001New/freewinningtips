function formatJackpotNameFromURL(urlPath) {
    const parts = urlPath.split('/').filter(part => part); // Remove empty parts
  
    if (parts.length === 2) {
      let formattedName = parts[1]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  
      // Remove "Predictions" if it's present
      if (formattedName.endsWith(' Predictions')) {
        formattedName = formattedName.slice(0, -12); // Remove the last 12 characters (length of " Predictions")
      }
  
      return formattedName;
    } else {
      return null; // Handle cases where the URL path doesn't match the expected format
    }
}

export default formatJackpotNameFromURL;