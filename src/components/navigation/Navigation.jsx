/* eslint-disable react/prop-types */
import './navigation.css'

const Navigation = ({onChangeRoute, signedIn}) => {
    if (signedIn) {
      return (
        <nav className='navigation right'>
          <p className="psign" onClick={() => onChangeRoute('login')}>
            Sign Out
          </p>
      </nav>
      )
    }
    return (
      <>
        <nav className='navigation right'>
          <p className="psign" onClick={() => onChangeRoute('login')}>
            Sign In
          </p>
          <p className="psign" onClick={() => onChangeRoute('register')}>
            Register
          </p>
        </nav>
      </>
    )
}

export default Navigation;
