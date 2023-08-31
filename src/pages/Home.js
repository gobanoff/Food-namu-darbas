import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Home = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const upLet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search)
      .then((resp) => resp.json())
      .then((resp) => setData(resp.meals));
  };

  const randMeal = (e) => {
    e.preventDefault();
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((resp) => resp.json())
      .then((resp) => setData(resp.meals));
  };

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((resp) => resp.json())
      .then((resp) => setList(resp.categories));
  }, []);

  const catList = (e) => {
    const sel = e.target.value;
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + sel)
      .then((resp) => resp.json())
      .then((resp) => setData(resp.meals));
  };

  return (
    <>
      <h1>Meal database search</h1>
      <form className="input-group" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter meal title"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary">Search</button>
      </form>
      <div className="lett">
        {upLet.map((el, index) => (
          <Link to={`/letters/${el}`} key={index}>
            {el}
          </Link>
        ))}
      </div>

      <select onChange={catList}>
        <option>Select Category</option>
        {list &&
          list.map((val, index) => (
            <option value={val.strCategory} key={index}>
              {val.strCategory}
            </option>
          ))}
      </select>

      <button className="btn btn-danger" onClick={randMeal}>
        Man sekasi
      </button>
      <div className="row mt-5">
        {data.map((value) => (
          <div className="col-6 mb-3" key={value.idMeal}>
            <Link to={"/meal/" + value.idMeal}>
              <img src={value.strMealThumb} alt={value.strMeal} />
            </Link>
            <h3>{value.strMeal}</h3>
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;
