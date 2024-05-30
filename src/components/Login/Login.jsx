/* eslint-disable react/prop-types */
import { Container, Form } from 'react-bootstrap';
import { useState } from 'react';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handlerEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlerPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onSubmitSignIn = () => {
    fetch("http://localhost:8080/signin", {
      "method": "post",
      "headers": {"Content-Type": "application/json"},
      "body": JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then((user) => {
        if (user.answer === 'invalid') {
          console.log("Not valid")
          props.onChangeRoute("login")
        } else {
          props.onLogin(user)
          console.log(user)
          props.onChangeRoute("home")
        }
      })
  }

  return (
    <Container>
      <div>
        <h1>Sign In</h1>
        <div className="mb-3">
          <label htmlFor="email1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email1" aria-describedby="emailHelp" onChange={handlerEmailChange}/>
          <div id="emailHelp" className="form-text">We will never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="inputPassword1"  onChange={handlerPasswordChange}/>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Keep me logged in</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={onSubmitSignIn}>Submit</button>
        <button type="submit" className="btn btn-primary ms-1" onClick={() => props.onChangeRoute('register')}>Register</button>
      </div>
    </Container>
  );
}

// const Login = ({onChangeRoute}) => {
//   return (
//     <Container>
//       <div>
//         <h1>Log In</h1>
//         <div className="mb-3">
//           <label htmlFor="email1" className="form-label">Email address</label>
//           <input type="email" className="form-control" id="email1" aria-describedby="emailHelp" />
//           <div id="emailHelp" className="form-text">We will never share your email with anyone else.</div>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="inputPassword1" className="form-label">Password</label>
//           <input type="password" className="form-control" id="inputPassword1" />
//         </div>
//         <div className="mb-3 form-check">
//           <input type="checkbox" className="form-check-input" id="exampleCheck1" />
//           <label className="form-check-label" htmlFor="exampleCheck1">Keep me logged in</label>
//         </div>
//         <button type="submit" className="btn btn-primary" onClick={() => onChangeRoute("home")}>Submit</button>
//         <button type="submit" className="btn btn-primary ms-1" onClick={() => onChangeRoute('register')}>Register</button>
//       </div>
//     </Container>
//   );
// };
export default Login;
