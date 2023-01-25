import { Link, useParams } from 'react-router-dom';

const ProductScreen = () => {
  const { slug } = useParams();

  return (
    <div>
      <Link to={'/'}>
        <strong>Back home </strong>
      </Link>
      <h1>{slug}</h1>
    </div>
  );
};

export default ProductScreen;
