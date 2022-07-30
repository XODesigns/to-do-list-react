import {useState, forwardRef} from 'react'

 const Checkbox = forwardRef(({toggleTodo}, refCheck) => {

    
  const [isChecked, setChecked] = useState(false)
  //  const inputRef = useRef(null)

    function handleChecked(e){
    setChecked(e.target.checked)
  }



  return (
    <>
     <input type="checkbox" ref={refCheck} onChange={handleChecked} checked={isChecked} />
    </>
  )
})

export default Checkbox