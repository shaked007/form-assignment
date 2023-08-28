import './App.css';
import {useState ,React } from 'react'
import TextField from '@mui/material/TextField';
import CheckBox from '@mui/material/Checkbox';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Swal from 'sweetalert2';

function App() {
  const [inputs,setInput] = useState({
      accountType:'manual',
      userName:'',
      password:'',
      serverAddress:'',
      serverPath:'',
      port:'',
      useSSL:false

  })
   const [errors,setErrors] = useState({
    accountType:false,
    userName:false,
    password:false,
    serverAddress:false,
    serverPath:false,
    port:false,
    useSSL:false

})


  const handleInput =(e)=>{
    console.log(e.target.value)
    setInput(prevInput=>{
      return {...prevInput,[e.target.name]:e.target.value}
    })
  }
 const handleSubmit= (e)=>{
  e.preventDefault()
  const isAdvanced = inputs['accountType']== 'Advanced' ? true : false
  console.log(inputs)
  if(inputs['userName'].length<1){
      setErrors(prev=>{
        return {...prev,userName:true}
      })
      return 
  }else if(inputs['password'].length<1){
    setErrors(prev=>{
      return {...prev,password:true}
    })
  }else if(  isAdvanced && !inputs['serverPath'].match(/^\/([^?\/]+)/)){
      setErrors(prev=>{
        return {...prev,serverPath:true}
      })
    }else if( isAdvanced && Number(inputs['port']) <1 ||  Number(inputs['port']) > 65535  ){
      setErrors(prev=>{
        return {...prev,port:true}
      })
      return 
    }
    else if(   !inputs['serverAddress'].match(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/)){
      setErrors(prev=>{
        return {...prev,serverAddress:true}
      })
      return 
    }
    
    const finalString = !isAdvanced ?JSON.stringify(inputs,['accountType','userName','password','serverAddress']) :JSON.stringify(inputs)
    Swal.fire({
      title: 'Hello!',
      text: finalString,
      icon: 'success',
      confirmButtonText: 'OK',
    });
    setInput({accountType:'manual',
    userName:'',
    password:'',
    serverAddress:'',
    serverPath:'',
    port:'',
    useSSL:false
})
    setErrors({
      accountType:false,
      userName:false,
      password:false,
      serverAddress:false,
      serverPath:false,
      port:false,
      useSSL:false
  
  })
    return 
  }
  return (
    <form className="forms-container" onSubmit={handleSubmit} >
        <Select value={inputs.accountType}     name='accountType'    onChange={handleInput}
 >
     
          <MenuItem value="manual" >manual </MenuItem> 
          <MenuItem value="Advanced" >Advanced </MenuItem> 

        </Select>
      <TextField 
      error={errors['userName']} 
      
      name='userName'
      onChange={handleInput}
      value={inputs.userName}
      placeholder='name@example.com'
      helperText={errors['userName'] ? 'must be a valid user' : ''}

        // helperText={nameError ? 'must be at least 3 charcters long' : ''}
      id="userName" label="userName" variant='outlined'  />
            <TextField 
      error={errors['password']} 
      type="password"
      name='password'
      placeholder='required'
      onChange={handleInput}
      value={inputs.password}
      helperText={errors['password'] ? 'must be a valid password' : ''}
        // helperText={nameError ? 'must be at least 3 charcters long' : ''}
      id="password" label="password"  variant='outlined' />
            <TextField 
      error={errors['serverAddress']} 
      name='serverAddress'
      onChange={handleInput}
      placeholder='example.com'
      value={inputs.serverAddress}
      helperText={errors['serverAddress'] ? 'must be a valid server address' : ''}

        // helperText={nameError ? 'must be at least 3 charcters long' : ''}
      id="serverAddress" label="serverAddress"  variant='outlined' />
      {inputs.accountType == 'Advanced' && 
      <>
          <TextField 
              error={errors['serverPath']} 
              name='serverPath'
              onChange={handleInput}
              placeholder='/calendar/user'
              value={inputs.serverPath}
              helperText={errors['serverPath'] ? 'must be a valid server path' : ''}

                // helperText={nameError ? 'must be at least 3 charcters long' : ''}
              id="serverPath" label="serverPath"  variant='outlined' />

          <div className='tiny-flex'>
          <TextField 
              error={errors['port']} 
              name='port'
              onChange={handleInput}
              // placeholder='/calendar/user'
              value={inputs.port}
                helperText={errors['port'] ? 'must be a port number between 1 and 65535' : ''}
              id="port" label="port"  variant='outlined' />
                <FormControlLabel control={<Checkbox defaultChecked />} label="useSSL" />
                </div>
          </>
      }
      <button className='submit-btn' type='submit'>submit </button>

    </form>
  );
}

export default App;
