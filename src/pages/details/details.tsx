import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const Details: React.FC = () => {
  const [data, setData] = useState<Product | null>(null); // Product type or null
  const location = useLocation();
  const [amount, setAmount] = useState(1)
  const { id } = location.state as { id: number }; // Type assertion to access `id`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!data) {
    return <p>Loading...</p>; // Show loading message while fetching data
  }
  function addAmount(){
    setAmount(amount+1)
  }
  function subtractAmount(){
    
    if(amount !== 0){
      setAmount(amount-1)
    }else{
      return
    }
  }
  return (
    <div>
      <h1>{data.title}</h1>
      <img src={data.image} alt={data.title} style={{ maxWidth: "300px" }} />
      <p><strong>Price:</strong> ${data.price}</p>
      <p><strong>Description:</strong> {data.description}</p>
      <p><strong>Category:</strong> {data.category}</p>
      <p>Amount of the product: <br /></p>

      <button onClick={subtractAmount}>-</button>{amount} <button onClick={addAmount}>+</button>
      <p>total price: {data.price * amount}</p>
    </div>
  );
};

export default Details;
