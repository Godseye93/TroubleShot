export function newLine(inputString: string) {
  const lines = inputString.split(",");

  const resultString = lines
    .map((line, index) => {
      if (index > 0 && !lines[index - 1].includes("\n")) {
        return "\n" + line;
      } else {
        return line;
      }
    })
    .join(",");

  return resultString;
}
