import {useState, useRef, useEffect} from 'react'
import {v4 as uuidv4} from "uuid"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ListItems from './ListItems';
import Footer from './Footer';
// import Navigation from "./Navigation";

import{db} from './firebase'
import {query, collection, onSnapshot, querySnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'



export default function Input({setTheme, theme}) {
    const [inputText, setInputText] = useState("");
    const [items, setItems] = useState([]);
    const [completedTaskCount, setCompletedTaskCount] = useState(0)
    const [checked, setChecked] = useState(false)
    const [active, setActive] = useState([])
    const [completed, setCompleted] = useState([])
    const [all, setAll] = useState([...items])


    
    function handleChange(evt) {
    const newValue = evt.target.value;
    setInputText(newValue);
  }


 

  const handleComplete = (id) => {
    let list = items.map((task) => {
      let item = {}
      if (task.id === id) {
        if (!task.complete){
          setCompletedTaskCount(completedTaskCount + 1)
        } else {
          setCompletedTaskCount(completedTaskCount - 1)
        }

        item = {...task, complete: !task.complete }
      } else item = {...task}

      return item
    })
    setItems(list)
  }

  function handleClear(){
   const newTodos = items.filter(todo => !todo.complete)
   setItems(newTodos)
   setCompletedTaskCount(0)
  }

  function handleAll(){
  setItems(all)
  }
  
  function handleActive(){
   const ActiveTodos = [...items]
   const activeList = ActiveTodos.filter(todo => !todo.complete)
   const list = ActiveTodos.filter(todo => todo.complete)
   setActive(list)
   setItems(activeList)
   console.log(list.length)
  }

  const handleChecked = (evt) =>{
    if(evt.target.value){
      setCompletedTaskCount(completedTaskCount - 1)
    } else {
      setCompletedTaskCount(completedTaskCount + 1)
    }
    
  }

  const handleViewComplete = () =>{
  const completeTodos = [...items]
  const completeList = completeTodos.filter(todo => todo.complete)
  const list = completeTodos.filter(todo => !todo.complete)
  setItems(completeList)
  setCompleted(list)
  }

 

  const handleOnDragEnd = (result) =>{
    if (!result.destination) return;
    // console.log(result)
    // const newItems = Array.from(items)
    const newItems = [...items]
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)

    setItems(newItems)
  }

 

  let listCount = items.filter(todo => !todo.complete)


//Create todo
const handleKeyDown = async (evt) => {
  // evt.preventDefault(evt)

  if (evt.key === "Enter" && inputText.trim().length !== 0) {

    await addDoc(collection(db, 'todos'), {
      text:inputText,
      complete:false,
    })
    setInputText("") 
    // setAll([...items, {id:uuidv4(), task:inputText, complete:false}]) 
  }
}

//Read todo from firebase
useEffect(()=>{
const q = query(collection(db,'todos'))
const unsubscribe = onSnapshot(q, (querySnapshot)=>{
let todosArr = []
  querySnapshot.forEach((doc) => {
    todosArr.push({...doc.data(), id: doc.id})
  })
  setItems(todosArr)
})
return () => unsubscribe()
},[])

//Update todo in firebase
const toggleComplete = async (todo) => {
  await updateDoc(doc(db, 'todos', todo.id),{
    complete:!todo.complete
  })
}

//Delete todo
const deleteTodo = async (id) => {
  await deleteDoc(doc(db, 'todos', id ), {
  })
  // setItems(items.filter((item) => item.id !== id))
}

   return (
    <>

      <div className={!theme ? 'text-input dark-theme' : 'text-input light-theme'}>
    <span className={!theme ? 'input-circle dark-theme' : 'input-circle light-theme'}></span>
     <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Create a new todo.." 
        value={inputText}
      />
      </div>

      
       <div className={!theme ? "list-items-list dark-theme" : "list-items-list light-theme" }>

       <DragDropContext onDragEnd={handleOnDragEnd}>
       <Droppable droppableId="characters">

       {(provided) => (

        <ul {...provided.droppableProps} ref={provided.innerRef}>

       <ListItems 
       Draggable={Draggable}  
       handleComplete={handleComplete}
       handleChecked={handleChecked}
       checked={checked}
       items={items}
       setItems={setItems}
 
       theme={theme}
       deleteTodo={deleteTodo}
       toggleComplete={toggleComplete}
       /> 
       {provided.placeholder}
      
       </ul> 
       )}

       
        </Droppable>
        </DragDropContext>
        
          <div className="navigation">
        {listCount.length} items left

      <div className="filter">
        <button className={all.task ? 'all-items' :" active-items-link"} onClick={handleAll}>All</button>
        <button className='active-items' onClick={handleActive}>Active</button>
        <button className='completed-items' onClick={handleViewComplete}>Completed</button>
      </div>
      <button className="clear" onClick={handleClear}>Clear Completed</button>
    </div>
    <Footer /> 
      </div>
          
    </>
  )



}
