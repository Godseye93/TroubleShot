export const removeHtmlAndMarkdownTags = (content: string) => {
  if (!content) return "";

  const cleanedText = content.replace(/(^#{1,6}\s.*)|(\*\*.*\*\*)|(```[\s\S]*?```)|(\[.*\]\(.*\))|-/gm, "");

  return cleanedText;
};
