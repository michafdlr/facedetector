/* eslint-disable react/prop-types */
import "./ImageDetector.css";

/*typeof boxes !== 'undefined' && boxes.length > 0*/
const ImageDetector = ({url, boxes}) => {
      if(url != '' && boxes.length > 0) {
        return(
          <div className="bounding-box imagebox">
            <img id="inputimage" src={url} alt="input_image" className="image"/>
            {boxes.map((box, i) =>
              <div className="bounding-box" style={{top: `${box[0]}%`, left: `${box[1]}%`, bottom: `${box[2]}%`, right: `${box[3]}%`}} key={i}></div>
            )}
          </div>
        )
      }
      return(
        <>
        </>
      )
  }

export default ImageDetector;
