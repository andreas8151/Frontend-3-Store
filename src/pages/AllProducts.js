import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./allProducts.scss";

export default function AllProducts() {
  /* --------------AllProducts-------------------- */

  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const res = await fetch("http://localhost:3001/products");
      const data = await res.json();
      setOriginalProducts(data);
    }
    getProducts();
  }, []);
  /* --------------------Search--------------------- */
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value === "") {
      setSearchResults(originalProducts);
    } else {
      const filteredProducts = [...originalProducts].filter((product) => {
        return product.title
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setSearchResults(filteredProducts);
    }
  };
  const searchResult = searchResults.map((product) => {
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
  });
  /* -----------------CheckBox-------------------- */
  const [sortByPrice, setSortByPrice] = useState(false);

  const handleCheckboxChange = (e) => {
    setSortByPrice(e.target.checked);
  };

  const sortedProducts = sortByPrice
    ? [...originalProducts].sort((a, b) => (a.price < b.price ? 1 : -1))
    : originalProducts;

  const productList = sortedProducts.map((product) => {
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
  });

  return (
    <div className="allProducts">
      <div className="head">
        <div className="head-text">
          <h1>Fashion & Function</h1> <p>The internets source for products.</p>
          <input
            className="search"
            type="text"
            placeholder="Search"
            onChange={handleSearch}
          />
        </div>
      </div>

      <h2>All Products</h2>
      <label>
        Sort by <strong className="price">$ Price</strong>{" "}
        <input
          type="checkbox"
          checked={sortByPrice}
          onChange={handleCheckboxChange}
        />
      </label>
      <div className="product-container">
        {searchTerm ? searchResult : productList}
      </div>
    </div>
  );
}
