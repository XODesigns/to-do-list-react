import {useState, forwardRef} from 'react'

 const Checkbox = forwardRef(({}, refCheck) => {

    
  const [isChecked, setChecked] = useState(false)
  //  const inputRef = useRef(null)

    function handleChecked(){
    setChecked(!isChecked)
  }

  console.log(isChecked)

  return (
    <>
     <input type="checkbox" ref={refCheck} onChange={handleChecked} value={isChecked} />
    </>
  )
})

export default Checkbox