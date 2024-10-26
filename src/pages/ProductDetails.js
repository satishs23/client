import React,{useState,useEffect} from 'react'
import Layout from '../componets/layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
//import { relatedProductController } from '../../../controllers/productController';
const ProductDetails = () => {
  const params =useParams()
 const [product,setProduct]=useState({})
 const [relatedProducts, setRelatedProducts] = useState([]);



  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

    //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
     <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
            />
        </div>
       
        <div className='col-md-6'>
            <h1 className="text-center">Product Details</h1>
            <h6>Name:{product.name}</h6>
            <h6>Description:{product.description}</h6>
            <h6>Price:{product.price}</h6>
             <h6>Category:{product.category?.name}</h6> 
            <button class="btn btn-secondary ms-1">ADD TO CART</button>

        </div>

     </div>
    <hr/>
    <div className='row'>
  <h6>Similar Products</h6>
  <div>
    {relatedProducts.length < 1 && <p className='text-center'>No Similar Products Found</p>}
    {relatedProducts.map((similarProduct) => (
      <div className="card m-2" style={{ width: "18rem" }} key={product._id}>
        <img
          src={`/api/v1/product/product-photo/${product._id}`}
          className="card-img-top"
          alt={product.name}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description.substring(0, 30)}</p>
          <p className="card-text">${product.price}</p>
          <button className='btn btn-primary ms-1'>ADD TO CART</button>
        </div>
      </div>
    ))}
  </div>
</div>

    </Layout>
  );
};

export default ProductDetails;