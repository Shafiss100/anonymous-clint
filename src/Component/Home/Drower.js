import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Drower = () => {
    return (
      <div class="drawer">
        <input id="for-friends" type="checkbox" class="drawer-toggle" />
        {/* <div class="drawer-content">
    <label for="for-friends" class="btn btn-primary drawer-button">Open drawer</label>
  </div>  */}
        <Outlet></Outlet>
        <h1 className="btn">hi</h1>
        <div class="drawer-side">
          <label for="for-friends" class="drawer-overlay"></label>
          <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <li>
              <NavLink to={"/dashboard/profile"}>My Profile</NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/order"}>My order</NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/friend"}>My Profile</NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
};

export default Drower;