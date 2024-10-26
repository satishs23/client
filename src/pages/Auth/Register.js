import React ,{useState} from 'react'
import Layout from '../../componets/layout/Layout'
import toast from "react-hot-toast";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import "../../styles/AuthStyles.css";

const Register = () => {
       const [name,setName]=useState("");
       const [email,setEmail]=useState("");
       const [password,setPassword]=useState("");
       const [phone,setPhone]=useState("");
       const [address,setAddress]=useState("");
       const [answer,setAnswer]=useState("");
       const navigate=useNavigate();

       //form function
       const handleSubmit = async (e) => {
        e.preventDefault();
       console.log("line 20")
         try {
           console.log("name:",name)
           const res = await axios.post(`${process.env.REACT_APP_API}/register`, {
             name,
             email,
             password,
             phone,
             address,
             answer,
         
           });
            console.log("res:",res)
           if (res && res.data.success) {
             toast.success(res.data && res.data.message);
            navigate("/");
           } else {
             toast.error(res.data.message);
           }
         } catch (error) {
           console.log(error)
           toast.error("Something went wrong");
         }
       };
       return (
        <Layout title="Register - Ecommer App">
          <div className="form-container" style={{ minHeight: "90vh" }}>
            <form>
              <h4 className="title">REGISTER FORM</h4>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="name"
                  placeholder="Enter Your Name"
                  required
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="email"
                  placeholder="Enter Your Email "
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="password"
                  placeholder="Enter Your Password"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  id="phone"
                  placeholder="Enter Your Phone"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  id="address"
                  placeholder="Enter Your Address"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="form-control"
                  id="answer"
                  placeholder="What is Your Favorite sports"
                  required
                />
              </div>
              <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                REGISTER
              </button>
            </form>
          </div>
        </Layout>
      );
    };
    
    export default Register;





