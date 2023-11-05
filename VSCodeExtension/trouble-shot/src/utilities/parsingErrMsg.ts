export function parsingErrMsg(stdout: string): { title: string; errMsg: string } {
  const errorIndicator = "Failed to compile.";
  const errorIndex = stdout.indexOf(errorIndicator);

  if (errorIndex !== -1) {
    const errorSection = stdout.substring(errorIndex + errorIndicator.length);

    const titleMatch = errorSection.match(/(Module not found: Error:|Syntax error:|Error:)/i);
    if (titleMatch) {
      const title = titleMatch[0].trim().replace(/:/gi, "");
      const errMsg = errorSection.substring(errorSection.indexOf(title)).trim();
      return { title, errMsg };
    }

    const refErrMatch = errorSection.match(/\[eslint][\s\S]*?no-undef/);
    if (refErrMatch) {
      const errMsg = refErrMatch[0];
      return { title: "Reference Error", errMsg };
    }

    const propertyErrRegex =
      /Property '\w+' does not exist on type '[\s\S]*?\r\n.*?\r\n.*?\r\n.*?\r\n/;
    const propertyErrMatch = errorSection.match(propertyErrRegex);
    if (propertyErrMatch && propertyErrMatch.index) {
      const endOfMessageMatch = errorSection.substring(propertyErrMatch.index).match(/^\s*$/m);
      if (endOfMessageMatch && endOfMessageMatch.index) {
        const errMsg = errorSection
          .substring(propertyErrMatch.index, propertyErrMatch.index + endOfMessageMatch.index)
          .trim();
        return { title: "Property Error", errMsg };
      }
    }
  }

  return { title: "", errMsg: "" };
}
