/* eslint-disable react/prop-types */
import { Container, Form } from 'react-bootstrap';

const Login = ({onChangeRoute}) => {
  return (
    <Container>
      <Form>
        <h1>Log In</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We will never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Keep me logged in</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={() => onChangeRoute("home")}>Submit</button>
        <button type="submit" className="btn btn-primary ms-1" onClick={() => onChangeRoute('register')}>Register</button>
      </Form>
    </Container>
  );
};
export default Login;
