import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./singleProduct.scss";

export default function SingleProduct() {
  const [product, SetProduct] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();

  /* ---------UPDATE------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateProduct = {
      title,
      price,
      description,
    };

    const res = await fetch(`http://localhost:3001/products/${id}`, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    });
    const data = await res.json();
    SetProduct(data);
  };

  /* ---------DELETE------------- */

  async function Delete() {
    const res = await fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
    });
  }
  /* --------FETCH ID------------ */

  useEffect(() => {
    async function getProduct() {
      const res = await fetch(`http://localhost:3001/products/${id}`);
      const data = await res.json();
      SetProduct(data);
    }
    getProduct();
  }, []);

  return (
    <div className="single-container">
      {" "}
      <div className="product-container">
        {" "}
        <div className="product" key={product.id}>
          <h2>{product.title}</h2>
          <img src={product.images} alt={product.name} />
          <p className="description"> {product.description}</p>

          <p className="dollar">${product.price}</p>
        </div>
      </div>
      <div className="update-container">
        <h2>Update Product</h2>
        <form className="formAdd" onSubmit={handleSubmit}>
          <div>
            {" "}
            <label htmlFor="name">Name:</label>
            <input
              className="input"
              placeholder="Product Name"
              id="name"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <br />
          <div>
            {" "}
            <label className="price-label" htmlFor="email">
              Price:
            </label>
            <input
              className="input"
              placeholder="$"
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <br />
          <div>
            {" "}
            <label className="text-label" htmlFor="text">
              Text:
            </label>
            <textarea
              placeholder="Description"
              className="input"
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <br />
          <div className="btn-container">
            {" "}
            <button className="submitBtn">Update</button>
            <button
              className="submitBtn deleteBtn"
              onClick={() => {
                Delete();
              }}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
