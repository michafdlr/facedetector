/* eslint-disable react/prop-types */
import "./ImageDetector.css";

/*typeof boxes !== 'undefined' && boxes.length > 0*/
const ImageDetector = ({url, boxes}) => {
      if(url != '' && boxes.length > 0) {
        console.log(boxes)
        return(
          <div className="center bounding-box imagebox">
            <img id="inputimage" src={url} alt="input_image" className="image"/>
            <div className="bounding-box" style={{top: '24.8%', left: "43.1%", bottom: "38.8%", right: '38.2%'}}></div>
            {/* <div className="bounding-box" style={{top: boxes[0][1], left: boxes[0][0], bottom: boxes[0][3], right: boxes[0][2], stroke: "black"}}></div> */}
          </div>
        )
      }
      return(
        <div className="center bounding-box imagebox">
          <img id="inputimage" src={url} alt="input_image"/>
          <div className="bounding-box" style={{top: '24.8%', left: "43.1%", bottom: "38.8%", right: '38.2%'}}></div>
        </div>
      )
  }

export default ImageDetector;
