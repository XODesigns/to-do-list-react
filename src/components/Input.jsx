import {useState, forwardRef, useEffect, useRef} from 'react'
import TodoItems from "./TodoItems";
import {v4 as uuidv4} from "uuid"
import Navigation from "./Navigation";




export default function Input() {
      const [inputText, setInputText] = useState("");
    const [items, setItems] = useState([]);
    // const refCheck = useRef()

     function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }


   const removeTodo = (id) =>{
    const newItems = [...items]
   newItems.splice(id, 1)
    setItems(newItems)

  }


  function handleKeyDown(e) {

    if (e.key === "Enter" && inputText.trim().length !== 0) {

      setItems((prev) => {
        return [...prev, {id:uuidv4(), item:inputText}]
      });
      setInputText("")     
    }
  }


  console.log(items)

   return (
    <>
     <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Create a new todo.."
        value={inputText}
      />

       <ul className="list-items-list">
        {items.map((todo) => (
          <TodoItems  key={todo.id} todos={todo.item} removeTodo={removeTodo}/>
        ))}
        
         <Navigation itemsLeft={items.length} />
      </ul>
            
    </>
  )



}
