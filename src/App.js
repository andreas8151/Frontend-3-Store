import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AllProducts from "./pages/AllProducts";
import AddProduct from "./pages/AddProduct";
import SingleProduct from "./pages/SingleProduct";
import Categories from "./pages/Categories";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {" "}
        <nav>
          <Link to="/">All Products</Link>
          <Link className="add" to="add-product">
            Add Product
          </Link>
          <p>|</p>
          <Link to="products/Clothes">
            <strong>Clothes</strong>
          </Link>
          <Link to="products/Furniture">
            <strong>Furniture</strong>
          </Link>
          <Link to="products/Shoes">
            <strong>Shoes</strong>
          </Link>
          <Link className="other" to="products/Others">
            <strong>Others</strong>
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="product/:id" element={<SingleProduct />} />
          <Route path="products/:id" element={<Categories />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
