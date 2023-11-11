export const getImageLink = (markdownText: string) => {
  const imageLinks = markdownText.match(/!\[.*\]\((.*?)\)/g);
  if (imageLinks) {
    return imageLinks.map((link) => {
      // Extract the URL from the matched image link
      const urlMatch = link.match(/\((.*?)\)/);
      if (urlMatch) {
        // eslint-disable-next-line
        return urlMatch[1].replace(/[\(\)]/g, ""); // Remove parentheses
      }
    });
  } else {
    return [];
  }
};
