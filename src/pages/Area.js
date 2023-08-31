import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";


const Area = () => {
  const { name } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + name)
      .then((resp) => resp.json())
      .then((resp) => {
        const land = resp.meals;
        console.log(resp);

        setData(land);
      });
  }, []);
  return (
    <>
      
      <h1>Area : {name}</h1>
      <Link to="/" className="btn btn-warning">
        HOME PAGE
      </Link>
      <div id="cat">
        {data.map((value) => (
          <div className="col-6 mb-3" key={value.idMeal}>
            <Link to={"/meal/" + value.idMeal}>
              <img
                className="img"
                src={value.strMealThumb}
                alt={value.strMeal}
              />
            </Link>
            <h3>{value.strMeal}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Area;
