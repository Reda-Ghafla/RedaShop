import { Link } from "react-router-dom";
import Rating from "./Rating";


const Product = ({ product }) => {
  return (
    <div key={product.slug} className="product">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product_info">
        <Link to={`/products/product/${product.slug}`}>
          <p>{product.name}</p>
          <p>
            <strong>${product.price}</strong>
          </p>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
