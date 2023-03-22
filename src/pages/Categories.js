import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./allProducts.scss";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    async function getProducts() {
      const res = await fetch("http://localhost:3001/products");
      const data = await res.json();
      setProducts(data);
    }
    getProducts();
  }, []);

  const productList = products.map((product) => {
    if (product.category.name === id) {
      return (
        <div className="product" key={product.id}>
          {" "}
          <Link to={`/product/${product.id}`}>
            <h3>{product.title}</h3>
            <img src={product.images} alt={product.name} />{" "}
            <p className="price">${product.price}</p>
          </Link>
        </div>
      );
    }
  });

  return (
    <div className="allProducts">
      <h2>{id}</h2>
      <div className="product-container">{productList}</div>
    </div>
  );
}
