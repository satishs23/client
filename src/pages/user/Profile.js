import React,{useState,useEffect} from 'react'
import Layout from '../../componets/layout/Layout'
import UserMenu from '../../componets/layout/UserMenu'
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {
  //context
  const [auth,setAuth]=useAuth()
  //state
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [phone,setPhone]=useState("");
  const [address,setAddress]=useState("");

  //get user data
  useEffect(()=>{
 const{ email,name,phone,address}=auth?.user
    setName(name)
    setAddress(address)
    
    setEmail(email)
    setPhone(phone)
  },[auth?.user])

    //form function
    const handleSubmit = async (e) => {
      e.preventDefault();
     console.log("line 20")
       try {
         console.log("name:",name)
         const {data} = await axios.put(`${process.env.REACT_APP_API}/profile`, {
           name,
           email,
           password,
           phone,
           address,
         });
         if (data?.errro) {
          toast.error(data?.error);
        } else {
          setAuth({ ...auth, user: data?.updatedUser });
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = data.updatedUser;
          localStorage.setItem("auth", JSON.stringify(ls));
          toast.success("Profile Updated Successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };

  return (
    <Layout title={ "Your Profile"}>
        <div className="container-fluid m-3 p-3 ">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
          <div className="form-container" style={{ minHeight: "90vh" }}>
            <form>
              <h4 className="title">USER PROFILE</h4>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="name"
                  placeholder="Enter Your Name"
               
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
               
                  disabled
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
               
                />
              </div>
              <button type="submit" onClick={handleSubmit} className="btn btn-primary">
               UPDATE
              </button>
            </form>
          </div>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default Profile;