import {useState} from 'react'

function ListItems({
    Draggable,
    handleComplete, 
    handleChecked,
    checked,
    items,
    setItems,
    theme,
    deleteTodo,
}) {

    const [display, setDisplay] = useState(0)



  return (
        <>

        {items.map((todo, index) => (

          <Draggable 
          key={todo.id} 
          draggableId ={todo.id}
          index={index}
          >
          
          {(provided, snapshot) => (

            <li  onMouseEnter={()=>{
                if(todo.id){
                setDisplay(todo.id)
                } 
              }}
              onMouseLeave={()=>{
                if(todo.id){
                    setDisplay(0)
                    }
              }}

              {...provided.draggableProps}
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              
              >

          <div className={!theme ? 'list-items dark-theme' : 'list-items light-theme'} 
          key={todo.id} 
          complete={todo.complete} 
          >

          <div className='items'
          >
          <input type="checkbox" onChange={()=> handleComplete(todo.id)} onClick={handleChecked} value={todo.task} checked={todo.complete || todo.complete ? !checked : null} />
          <span className={` ${todo.complete || todo.complete ? "checked-item" : "not-checked-item"} ${!theme ? "dark-theme" : "light-theme" }`}>{todo.task}</span>
          </div>
          <span onClick={()=> deleteTodo(todo.id)}>
          {display === todo.id && <p className='clear-me'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" margin="0" viewBox="0 0 25 25" fill="none" stroke="var(--border-list)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><line x1="25" y1="6" x2="6" y2="25"></line><line x1="6" y1="6" x2="25" y2="25"></line></svg></p>}
          </span>
          </div> 
          </li>

          )}
          </Draggable>
        ))}
       
        </>
  )
}

export default ListItems