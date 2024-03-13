import React, { useState } from 'react'
import { Input, Button } from 'reakit'

const URLInjection = () => {

  // https://9432-161-22-31-212.ngrok-free.app/images/document.cookie
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{margin: '8px 24px'}}>
      <h1>Insert your image</h1>
      <form 
          style={{width: '100%'}}
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
        }}>
          <Input style={{width: '100%'}} onChange={e => setValue(e.target.value)}/>
          <Button style={{width: '50%'}} onClick={() => setSubmitted(true)}>Submit</Button>
        </form>

        {submitted && <img width={'90%'} height={'500px'} src={value}/>}
    </div>
  )
}

export default URLInjection;