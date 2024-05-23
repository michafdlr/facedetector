import { useEffect, useState } from 'react'
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import LinkInput from './components/linkInput/LinkInput'
import Rank from './components/rank/Rank'
import ImageDetector from './components/ImageDetector/ImageDetector'
import './App.css'//
import ParticlesBg from 'particles-bg'
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

  // const calculateFacePositions = (box) => {
  //   const topRow = box[0]
  //   const leftCol = box[1]
  //   const bottomRow = box[2]
  //   const rightCol = box[3]
  //   const image = document.getElementById("inputimage")
  //   const width = Number(image.width)
  //   const height = Number(image.height)
  //   const startX = leftCol*width
  //   const startY = topRow*height
  //   const endX = width - rightCol*width
  //   const endY = height - bottomRow*height
  //   console.log(width, height)
  //   return [startY, startX, endY, endX]
  // }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    setUrl(e.target[0].value)
  }

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
        <Navigation />
        <Logo />
        <Rank />
        <LinkInput onSubmit={handleOnSubmit} />
        <ImageDetector url={url} boxes={boxes}/>

        <ParticlesBg type="cobweb" color="#005eff" num={300}  bg={true} />
    </>
  )
}

export default App
