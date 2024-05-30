/* eslint-disable react/prop-types */
import { Container, Form } from 'react-bootstrap';
import { useState } from 'react';

const Register = (props) => {
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const handlerNameChange = (e) => {
    setName(e.target.value)
  }

  const handlerMailChange = (e) => {
    setMail(e.target.value)
  }

  const handlerPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handlerPasswordRepeatChange = (e) => {
    setPasswordRepeat(e.target.value)
  }

  const onSubmit = () => {
    if (name.length > 0 && mail.search('@') != -1 && password.length>0 && password === passwordRepeat) {
      fetch("http://localhost:8080/register", {
        "method": "post",
        "headers": {"Content-Type": "application/json"},
        "body": JSON.stringify({
          name: name,
          email: mail,
          password: password
        })
      })
        .then(response => response.json())
        .then(user => {
          if (user) {
            props.onRegister(user)
            console.log('Registration successful for ', user)
            return props.onChangeRoute("home")
          }
        })
    } else if (name.length === 0) {
      alert('name has to be filled')
    } else if (mail.search('@') === -1){
      alert('invalid mail')
    } else if (password.length === 0) {
      alert('password has to be filled')
    } else if (password != passwordRepeat) {
      alert('password does not match repeated password')
    }
  }

  return (
    <Container>
      <div>
        <h1>Register</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="text" className="form-control" id="name1" aria-describedby="nameHelp" onChange={handlerNameChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handlerMailChange}/>
          <div id="emailHelp" className="form-text">We will never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" onChange={handlerPasswordChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Repeat Password</label>
          <input type="password" className="form-control" id="validatePassword1" onChange={handlerPasswordRepeatChange}/>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={onSubmit}>Submit</button>
      </div>
    </Container>
  );
}

// const Register = ({onChangeRoute}) => {
//   return (
//     <Container>
//       <div>
//         <h1>Register</h1>
//         <div className="mb-3">
//           <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
//           <input type="text" className="form-control" id="name1" aria-describedby="nameHelp" onChange={handlerNameChange}/>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
//           <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handlerMailChange}/>
//           <div id="emailHelp" className="form-text">We will never share your email with anyone else.</div>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//           <input type="password" className="form-control" id="exampleInputPassword1" onChange={handlerPasswordChange}/>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="exampleInputPassword1" className="form-label">Repeat Password</label>
//           <input type="password" className="form-control" id="validatePassword1" onChange={handlerPasswordRepeatChange}/>
//         </div>
//         <div className="mb-3 form-check">
//           <input type="checkbox" className="form-check-input" id="exampleCheck1" />
//           <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
//         </div>
//         <button type="submit" className="btn btn-primary" onClick={onSubmit}>Submit</button>
//       </div>
//     </Container>
//   );
// };
export default Register;
