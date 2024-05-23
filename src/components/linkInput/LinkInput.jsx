/* eslint-disable react/prop-types */
const LinkInput = ({onSubmit}) => {
  return (
    <div className="linkbox">
      <p style={{textAlign: 'center', fontWeight: 'bold'}}>
        Put in the url to an image and detect faces
      </p>
      <div className="center">
        <form onSubmit={onSubmit} style={{width:'100%', height:'30px', textAlign: 'left', marginRight: '1%'}}>
          <input style={{width:'60%', height:'30px', textAlign: 'left', marginRight: '1%', marginLeft: '1%'}} type="text" name="image_url"/>
          <button>
            Detect
          </button>
        </form>
      </div>
    </div>
  )
}

export default LinkInput;
