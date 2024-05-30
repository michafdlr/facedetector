/* eslint-disable react/prop-types */
const Rank = ({ name, counter}) => {
  return (
    <div className="rank">
      <h2>
      {name}, the number of pictures you checked is:
      </h2>
      <h1>
        {counter}
      </h1>
    </div>
  )
}

export default Rank;
