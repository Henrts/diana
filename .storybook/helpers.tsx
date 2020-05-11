import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai as hlstyle } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface IHightlightProps {
  text: string;
}

export const Highlight: React.FC<IHightlightProps> = ({ text }) => (
  <SyntaxHighlighter language="typescript" style={hlstyle}>
    {text}
  </SyntaxHighlighter>
);

export const typesHighlight = (propTypes: string, styleTypes: string) => ({
  Props: () => <Highlight text={propTypes} />,
  Styles: () => <Highlight text={styleTypes} />
});
