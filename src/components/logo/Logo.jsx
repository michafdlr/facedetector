import Tilt from 'react-parallax-tilt';
import './logo.css';

const Logo = () => {
  return (
    <>
      <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} className='tiltdiv left'>
          <h1>Some Logo</h1>
      </Tilt>
    </>
  )
}

export default Logo;
