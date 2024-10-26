import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <>
            <div className="text-center">
                <div className="list-group">
                    <h4>Admin Panel</h4>
                    <NavLink 
                    to="/dashboard/admin/creat-Category"
                     className="list-group-item list-group-item-action">
                    Creat Category
                        </NavLink>
                    <NavLink 
                    to="/dashboard/admin/creat-product"
                     className="list-group-item list-group-item-action">
                    Creat Product
                        </NavLink>
                  <NavLink 
                    to="/dashboard/admin/products"
                     className="list-group-item list-group-item-action">
                    Products
                    </NavLink>

                    <NavLink 
                    to="/dashboard/admin/orders"
                     className="list-group-item list-group-item-action">
                    Orders
                    </NavLink>

                    <NavLink
                     to="/dashboard/admin/user"
                     className="list-group-item list-group-item-action">
                        User
                        </NavLink>
                </div>
            </div>


    </>
  );
};

export default AdminMenu