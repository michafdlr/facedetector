/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useLayoutEffect } from 'react'
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import LinkInput from './components/linkInput/LinkInput'
import Rank from './components/rank/Rank'
import ImageDetector from './components/ImageDetector/ImageDetector'
import Login from './components/Login/Login'
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
  const PAT = import.meta.env.VITE_APP_PAT;
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'clarifai';
  const APP_ID = 'main';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';



  const [url, setUrl] = useState('')
  const [boxes, setBoxes] = useState([])
  const [route, setRoute] = useState('login')
  const [isSignedIn, setIsSignedIn] = useState(false)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    setBoxes([])
    setUrl(e.target[0].value)
  }

  const handleOnChangeRoute = (input) => {
    setRoute(input)
    setUrl('')
    if (input === 'home') {
      setIsSignedIn(true)
    } else if (input === 'login') {
      setIsSignedIn(false)
    }
  }

  useLayoutEffect(() => {
    fetch("http://localhost:8080")
      .then(response => response.json())
      .then(console.log)
  }, [])

  useEffect(() => {
    if (url.length != 0) {
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
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
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
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
                // region.data.concepts.forEach(concept => {
                //     // Accessing and rounding the concept value
                //     const name = concept.name;
                //     const value = concept.value.toFixed(4);
                //     console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);

                // });
            })
            setBoxes(locBoxes);
        })
        .catch(error => console.log('error', error));
    }
  }, [url])

  return (
    <>
        <Navigation onChangeRoute={handleOnChangeRoute} signedIn={isSignedIn}/>
        <Logo />
        {
          route === 'home' ?
          <>
            <Rank />
            <LinkInput onSubmit={handleOnSubmit} />
            <ImageDetector url={url} boxes={boxes}/>
          </>
        : route === 'login' ?
          <Login onChangeRoute={handleOnChangeRoute}/>
        :
          <Register onChangeRoute={handleOnChangeRoute}/>
        }

        <ParticlesBg type="cobweb" color="#005eff" num={300}  bg={true} />
    </>
  )
}

export default App
