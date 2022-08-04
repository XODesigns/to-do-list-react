import {useState} from 'react'


export default function TodoItems ({todos, removeTodo}) {

    const [isChecked, setChecked] = useState(false)


      function handleChecked(){
    setChecked(!isChecked) 
    }

    
      function handleClicked(){
    removeTodo(todos.id)
    }



let completedClass = ''

  if(isChecked){
    completedClass = "completed"
  }


  return (
    <li className={completedClass}>
    <input type="checkbox"  onChange={handleChecked} onClick={handleClicked} />
        {todos}
    </li>

  )
}



