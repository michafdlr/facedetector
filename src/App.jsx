import { useState } from 'react'
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import LinkInput from './components/linkInput/LinkInput'
import Rank from './components/rank/Rank'
import ImageDetector from './components/ImageDetector/ImageDetector'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'//
import ParticlesBg from 'particles-bg'
// import process from 'process';

function App() {
  const [url, setUrl] = useState('')

  const handleOnSubmit = (e) => {
    e.preventDefault()
    setUrl(e.target[0].value)
    console.log(url)
  }

  return (
    <>
        <Logo />
        <Navigation />
        <Rank />
        <LinkInput onSubmit={handleOnSubmit} />
        <ImageDetector url={url}/>
      {/*
      <Login /> */}
        <ParticlesBg type="cobweb" color="#005eff" num={300}  bg={true} />
    </>
  )
}

export default App
