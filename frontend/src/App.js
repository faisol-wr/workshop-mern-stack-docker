import { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "http://localhost:3003/api/products";

function App() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setProducts(response.data);
    });
  }, []);

  if (!products) return null;

  return (
    <div>
      {products.map((element) => {
        return (
          <div key={element.id}>
            <h2>{element.productName}</h2>
            <p>{element.price}</p>
            <p>{element.thumbnail}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
