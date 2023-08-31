import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Ingredients = () => {
  const { name } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + name)
      .then((resp) => resp.json())
      .then((resp) => {
        const ing = resp.meals;
        console.log(resp);

        setData(ing);
      });
  }, []);

  return (
    <>
      <h1>Ingredients : {name}</h1>
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

export default Ingredients;
