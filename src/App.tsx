import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <center>
        <div id="cont">
          {loading ? (
            <p className="loading">Loading...</p>
          ) : (
            products.map((product) => (
              <li className="item" key={product.id}>
                <h2>{product.title}</h2>
                <img src={product.image} alt={product.title} />
                <p>${product.price}</p>
                <p id="category">{product.category}</p>
                <Link
                  to={{
                    pathname: "/details",
                  }}
                  state={{ id: product.id }} // Pass the `id` in `state`
                >
                  <button id="view-more-button">View More</button>
                </Link>
              </li>
            ))
          )}
        </div>
      </center>
    </>
  );
}

export default App;
