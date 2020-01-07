import React from "react";
import "./App.css";
import { ThemeProvider } from "aesthetic-react";
import { BaseButton } from "./modules/Button";
import { initDefaultTheme } from "./setup";
import { H1 } from "./modules/Typography";

initDefaultTheme();

const App: React.FC = () => (
  <ThemeProvider name="default_theme">
    <div className="App">
      <BaseButton>Base</BaseButton>
      <H1>HEADING 1</H1>
    </div>
  </ThemeProvider>
);

export default App;
