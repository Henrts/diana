import React from "react";
import "./App.css";
import { ThemeProvider } from "aesthetic-react";
import { BaseButton } from "./components/Button";
import initDefaultTheme from "./setup";
import { H1 } from "./components/Typography";

initDefaultTheme();

const App: React.FC = () => (
  <ThemeProvider name="default">
    <div className="App">
      <BaseButton />
      <H1>HEADING 1</H1>
    </div>
  </ThemeProvider>
);

export default App;
