import {useState, useRef, useEffect} from 'react'
import Checkbox from './Checkbox'


export default function TodoItems(props) {

  return (
    <li>
        {props.todos}
    </li>
  )
}


