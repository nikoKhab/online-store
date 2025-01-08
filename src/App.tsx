import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const url = "https://fakestoreapi.com/products";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  function getId(product){
    const id = product.id;
    console.log(id)
  }


  return (
    <>
      <center><div id="cont">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          products.map((product) => (
            <li className="item" key={product.id}>
              <h2>{product.title}</h2>
              <img src={product.image} alt="" />
              <p>{product.price}</p>
              <p id="category">{product.category}</p>
              {/* <Link to={"/details"}> */}
              <button onClick={() => getId(product)} id="view-more-button">view more</button>
              {/* </Link> */}
              
            </li>
          ))
        )}
      </div></center>
    </>
  );
}

export default App;
