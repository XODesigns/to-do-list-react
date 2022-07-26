import { useState } from "react";
import Sun from "../images/icon-sun.svg";
import TodoItems from "./TodoItems";
import {v4 as uuidv4} from "uuid"
import Navigation from "./Navigation";

export default function Header() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);


  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && inputText.trim().length !== 0) {
      setItems((prev) => {
        return [...prev, inputText]
      });
      setInputText("");
    }
  }


  return (
    <div className="todoContainer">
      <h1>Todo</h1>
      <img src={Sun} />
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Create a new todo.."
        value={inputText}
      />

      <ul className="list-items-list">
        {items.map((todoItem) => (
          <TodoItems  key={uuidv4()}  todos={todoItem} />
        ))}
         <Navigation itemsLeft={items.length} />
      </ul>

    </div>
  );
}
