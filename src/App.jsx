/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef} from 'react'
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import LinkInput from './components/linkInput/LinkInput'
import Rank from './components/rank/Rank'
import ImageDetector from './components/ImageDetector/ImageDetector'
import Login from './components/Login/Login'
import ResetPassword from './components/reset/ResetPassword'
import './App.css'//
import ParticlesBg from 'particles-bg'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Register from './components/Register/Register';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

function App() {
  // const PAT = import.meta.env.VITE_APP_PAT;
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'clarifai';
  const APP_ID = 'main';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

  const initialUser = {
    id: '',
    name: '',
    email: '',
    counter: 0,
    joined: ''
  }



  const [url, setUrl] = useState('')
  const [boxes, setBoxes] = useState([])
  const [route, setRoute] = useState('login')
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState(initialUser)
  const prevUrlRef = useRef();

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (prevUrlRef.current != e.target[0].value) {
      setUrl(e.target[0].value)
      fetch("http://localhost:8080/image", {
        "method": "put",
        "headers": {"Content-Type": "application/json"},
        "body": JSON.stringify({
          id: user.id
        })
      })
        .then(response => response.json())
        .then(counter => Object.assign(user, {"counter": counter}))
    }
  }

  const handleOnChangeRoute = (input) => {
    setRoute(input)
    setUrl('')
    if (input === 'home') {
      setIsSignedIn(true)
    } else if (input === 'login') {
      setUrl('')
      prevUrlRef.current = ''
      setUser(initialUser)
      setIsSignedIn(false)
    }
  }

  const handleUserRegistration = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      counter: data.counter,
      joined: data.joined
    })
  }

  // useLayoutEffect(() => {
  //   fetch("http://localhost:8080")
  //     .then(response => response.json())
  //     .then(console.log)
  // }, [])

  useEffect(() => {
    if (url.length != 0 && url !== prevUrlRef.current) {
      setBoxes([])
      const raw = JSON.stringify({
        "user_app_id": {
            user_id: USER_ID,
            app_id: APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": url
                    }
                }
            }
        ]
      });

    const requestOptions = {
        method: 'POST',
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
            // 'Authorization': 'Key ' + PAT
        },
        // body: raw
        body: JSON.stringify({ url: `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, data: raw })
    };
    fetch('http://localhost:8080/api/proxy', requestOptions)
        .then(response => response.json())
        .then(result => {
          const regions = result.outputs[0].data.regions;
          const locBoxes = [];
          regions.forEach(region => {
              // Accessing and rounding the bounding box values
              const boundingBox = region.region_info.bounding_box;
              const topRow = boundingBox.top_row.toFixed(3);
              const leftCol = boundingBox.left_col.toFixed(3);
              const bottomRow = boundingBox.bottom_row.toFixed(3);
              const rightCol = boundingBox.right_col.toFixed(3);
              locBoxes.push([topRow*100, leftCol*100, 100 - 100*bottomRow, 100-100*rightCol])
          })
          setBoxes(locBoxes);
        })
        .catch(error => console.log('error', error));
        prevUrlRef.current = url;
    }
  }, [url])

  return (
    <>
        <Navigation onChangeRoute={handleOnChangeRoute} signedIn={isSignedIn}/>
        <Logo />
        {
          route === 'home' ?
          <>
            <Rank name={user.name} counter={user.counter}/>
            <LinkInput onSubmit={handleOnSubmit} />
            <ImageDetector url={url} boxes={boxes}/>
          </>
        : route === 'login' ?
          <Login onLogin={handleUserRegistration} onChangeRoute={handleOnChangeRoute}/>
        :
          route === 'reset' ?
          <ResetPassword onChangeRoute={handleOnChangeRoute} onReset={handleUserRegistration}/>
        :
          <Register onChangeRoute={handleOnChangeRoute} onRegister={handleUserRegistration}/>
        }

        <ParticlesBg type="cobweb" color="#005eff" num={300}  bg={true} />
    </>
  )
}

export default App
