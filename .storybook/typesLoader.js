const fs = require("fs");

const FILE_REGEX = /\/modules\/[a-zA-Z]+\/[a-zA-Z]+.tsx?$/;

const PROPS_INTERFACE_REGEX = /interface[ a-zA-Z]*Props[ a-zA-Z<>",&|]*{(((\n.{2,})+(\n}){1})|( *}))/;
const STYLES_INTERFACE_REGEX = /interface[ a-zA-Z]*Styles[ a-zA-Z<>",&|]*{(((\n.{2,})+(\n}){1})|( *}))/;

function typesLoader(source, file) {
  if (!FILE_REGEX.test(file.file) && file.sourcesContent && file.sourcesContent.length > 0) {
    return source;
  }

  let propsInterface = "";
  let stylesInterface = "";
  let tempProps = PROPS_INTERFACE_REGEX.exec(file.sourcesContent[0]);
  let tempStyles = STYLES_INTERFACE_REGEX.exec(file.sourcesContent[0]);

  if (tempProps && tempProps.length > 0) {
    propsInterface = tempProps[0];
  }

  if (tempStyles && tempStyles.length > 0) {
    stylesInterface = tempStyles[0];
  }

  return `${source}
    exports["typesLoaderProps"] = \`${propsInterface}\`;
    exports["typesLoaderStyles"] = \`${stylesInterface}\`;
    `;
}

module.exports = typesLoader;
