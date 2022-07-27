import {useState, forwardRef} from 'react'
import TodoItems from "./TodoItems";
import {v4 as uuidv4} from "uuid"
import Navigation from "./Navigation";


const Input = forwardRef(({}, ref)=>{
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
    <>
     <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Create a new todo.."
        value={inputText}
        ref={ref}
      />

            <ul className="list-items-list">
        {items.map((todoItem) => (
          <TodoItems  key={uuidv4()}  todos={todoItem} />
        ))}
        
         <Navigation itemsLeft={items.length} />
      </ul>
            
    </>
  )
})

export default Input