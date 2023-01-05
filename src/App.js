import { useState } from "react";
import Form from "./components/Form"

function App() {

  const [theme, setTheme] = useState(false)

  return (
    <div className={!theme ? "todo-background dark-theme" : "todo-background light-theme"}>
    <Form theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default App;
