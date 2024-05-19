const LinkInput = () => {
  return (
    <div className="linkbox">
      <p style={{textAlign: 'center', fontWeight: 'bold'}}>
        Put in the url to an image and detect faces
      </p>
      <div className="center">
        <input style = {{width:'60%', height:'30px', textAlign: 'left', marginRight: '20px'}} type="text" />
        <button>
          Detect
        </button>
      </div>
    </div>
  )
}

export default LinkInput;
