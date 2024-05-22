/* eslint-disable react/prop-types */
const LinkInput = ({onSubmit}) => {
  return (
    <div className="linkbox">
      <p style={{textAlign: 'center', fontWeight: 'bold'}}>
        Put in the url to an image and detect faces
      </p>
      <div className="center">
        <form onSubmit={onSubmit} style={{width:'100%', height:'30px', textAlign: 'left', marginRight: '20px'}}>
          <input style={{width:'70%', height:'30px', textAlign: 'left', marginRight: '20px', marginLeft: '20px'}} type="text" name="image_url"/>
          <button>
            Detect
          </button>
        </form>
      </div>
    </div>
  )
}

export default LinkInput;
