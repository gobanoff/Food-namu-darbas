import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Meal = () => {
  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
      .then((resp) => resp.json())
      .then((resp) => {
        const meal = resp.meals[0];
        console.log(resp);
        //meal.strYoutube = 'https://www.youtube.com/embed/' + meal.strYoutube.split('?v=')[1];
        meal.strYoutube = meal.strYoutube.replace("watch?v=", "embed/");
        setData(meal);
      });
  }, []);

  const Ingredients = () => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = data["strIngredient" + i];
      const measure = data["strMeasure" + i];

      ingredient &&
        ingredients.push(
          <li key={i}>
            <Link to={"/ingredients/" + ingredient}>
              {" "}
              {ingredient} {measure}
            </Link>
          </li>
        );
    }

    return ingredients;
  };

  return (
    <div className="container">
      <h1>Patiekalo informacija: {id}</h1>
      {data && (
        <div className="row mt-5">
          <Link to="/" className="btn btn-warning">
            HOME PAGE
          </Link>
          <div className="col-6">
            <img src={data.strMealThumb} alt={data.strMeal} className="mb-3" />
            <iframe
              width="100%"
              height="315"
              src={data.strYoutube}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="col-6">
            <h2>{data.strMeal}</h2>
            <ul>
              <li>
                Category :
                <Link to={"/category/" + data.strCategory}>
                  {data.strCategory}
                </Link>
              </li>
              <li>
                Area :<Link to={"/area/" + data.strArea}>{data.strArea}</Link>
              </li>
            </ul>
            <h3>Ingredients</h3>

            <Ingredients />
          </div>
        </div>
      )}
    </div>
  );
};

export default Meal;
