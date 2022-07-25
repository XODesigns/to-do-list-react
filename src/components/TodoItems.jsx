import {useState} from 'react'

export default function TodoItems(props) {

  const [isChecked, setChecked] = useState(false)

    function handleChecked(){
    setChecked(!isChecked)
  }

  let className = ""
    if(isChecked){
      className = 'completed'
    }


  return (
    <li className={className}>
    <input type="checkbox" onChange={handleChecked}  value={props.checked} />
        {props.todos}
    </li>
  )
}
