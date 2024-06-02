/* eslint-disable react/prop-types */
import { Container } from 'react-bootstrap';
import { useState } from 'react';

const ResetPassword = (props) => {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

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
    if (password.length>0 && password === passwordRepeat) {
      fetch("http://localhost:8080/reset", {
        "method": "put",
        "headers": {"Content-Type": "application/json"},
        "body": JSON.stringify({
          email: mail,
          password: password
        })
      })
        .then(response => {
          if (response.status === 400) {
            return props.onChangeRoute("reset")
          } else {
            console.log('Password was reset')
            return props.onChangeRoute("login")
          }
        })
        .catch(err => console.log(err))
    } else if (password.length === 0) {
      alert('password has to be filled')
    } else if (password != passwordRepeat) {
      alert('password does not match repeated password')
    }
  }

  return (
    <Container>
      <div>
        <h1>Reset Password</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handlerMailChange}/>
          <div id="emailHelp" className="form-text">We will never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" onChange={handlerPasswordChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Repeat New Password</label>
          <input type="password" className="form-control" id="validatePassword1" onChange={handlerPasswordRepeatChange}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={onSubmit}>Submit</button>
      </div>
    </Container>
  );
}

export default ResetPassword;
