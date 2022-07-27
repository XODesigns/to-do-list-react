import {useState, useRef, useEffect} from 'react'
import Checkbox from './Checkbox'


export default function TodoItems(props) {
  const ref = useRef()

  return (
    <li>
    <Checkbox ref={ref} />
        {props.todos}
    </li>
  )
}


