import React, { useState } from "react";
import "./addProduct.scss";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      title,
      price,
      description,
      images: "https://api.lorem.space/image/watch?w=640&h=480&r=4535",
      category: {
        name: "Other",
      },
    };
    const res = await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="addProduct-container">
      <h1>Add Product</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label className="addProduct-label" htmlFor="title">
          Title
        </label>
        <input
          placeholder="Product Name"
          className="addProduct-input"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="addProduct-label" htmlFor="price">
          Price
        </label>
        <input
          placeholder="$"
          className="addProduct-input"
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />{" "}
        <label className="addProduct-label" htmlFor="text">
          Text
        </label>
        <textarea
          placeholder="Description"
          className="addProduct-input"
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="submit-btn" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}
