import { useState } from 'react'
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import LinkInput from './components/linkInput/LinkInput'
import Rank from './components/rank/Rank'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'//
import ParticlesBg from 'particles-bg'

function App() {
  return (
    <>
        <Logo />
        <Navigation />
        <Rank />
        <LinkInput />
      {/*
      <Login />
      <Imagedetector /> */}
        <ParticlesBg type="cobweb" color="#005eff" num={300}  bg={true} />
    </>
  )
}

export default App
