export const onTransformText = (text) => {
    const newText = text.split("");
    newText[0] = newText[0].toUpperCase();
    return newText.join("");
  };