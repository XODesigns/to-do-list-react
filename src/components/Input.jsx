import {useState, forwardRef, useEffect, useRef} from 'react'
import TodoItems from "./TodoItems";
import {v4 as uuidv4} from "uuid"
import Navigation from "./Navigation";
import Checkbox from './Checkbox';


const Input = forwardRef(({}, ref)=>{
      const [inputText, setInputText] = useState("");
    const [items, setItems] = useState([]);
    const refCheck = useRef()

     function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function toggleTodo(id){
    const newTodos =  [...items]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.completed
    setItems(newTodos)
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && inputText.trim().length !== 0) {
      setItems((prev) => {
        return [...prev, {id:uuidv4(), item:inputText, completed:false}]
      });
      setInputText("");
    }
  }

    useEffect(()=>{
    const checkbox = refCheck.current
console.log(checkbox)
  })

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
          <div key={todo.id}>
          <Checkbox ref={refCheck}/>
          <TodoItems  todos={todo.item} toggleTodo={toggleTodo} />
        </div>
        ))}
        
         <Navigation itemsLeft={items.length} />
      </ul>
            
    </>
  )
})

export default Input