import React,{useState,useEffect} from 'react'
import Layout from '../componets/layout/Layout'
import axios from 'axios'
import { useParams ,useNavigate} from 'react-router-dom'


const CategoryProduct = () => {
    const parmas =useParams();
    const navigate=useNavigate();
    const [products, setProducts] =useState([])
    const [category, setCategory] =useState([])

   useEffect(()=>{
   if(parmas?.slug)getProductsByCat()
   },[parmas?.slug]) 
    const getProductsByCat=async()=>{
        try{
         const {data}= await axios.get(`/api/category/product/product-category/${parmas.slug}`)
         setProducts(data?.products)
         setCategory(data?.category)
        }catch(error){
            console.log(error)
        }
    }
  return (
  <Layout>
    <div className='container mt-3'>
        <h4 className="text-center"> category-{category?.name}</h4>
    <h6 className="text-center">{products?.name} resutls found</h6>
    <div className='row'>
    <div className="d-flex flex-wrap">
          {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0,30)}</p>
                  <p className="card-text">${p.Prices}</p>
                  <button className='btn btn-primary ms-1' onClick={()=>navigate(`/product/${p.slug}`)} > More Details</button>
                  <button className='btn btn-primary ms-1' > ADD TO CART</button>
                </div>
              </div>
           
          ))}
          </div>
          {/* <div className=' m-2 p-3'>
            {products && products.length<total&&(
              <button className='btn btn-warning' onClick={(e)=>{
                e.preventDefault();
                setPage(page +1);
              }
              }>
                { loading ?"Loading....": "LoadMore"}
              </button>
            )}
         
          </div> */}
          </div>   
      </div>
    </Layout>
  );
};

export default CategoryProduct;