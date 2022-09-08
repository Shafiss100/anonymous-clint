import React, { useState } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "./Firebase.init";

const SignUp = () => {
  const [updateProfile, updating, upError] = useUpdateProfile(auth);
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, euser, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [user, userLoading, userError] = useAuthState(auth);

  const signup = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const displayName = event.target.name.value;
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName });
    await fetch("https://ancient-wildwood-82819.herokuapp.com/user", {
      method: "POST",
      body: JSON.stringify({
        displayName: displayName,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    navigate("/");
  };
  return (
    <form className="bg-slate-500" onSubmit={signup}>
      <div className="hero min-h-screen login-page">
        <div>
          <div className="card min-w-lg shadow-2xl ">
            <div className="card-body p-3 w-96  login-box">
              <h1 className="text-4xl ">Please Sign up</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text ">User name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="User Name"
                  className="input input-ghost w-full max-w-xs"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text ">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-ghost w-full max-w-xs"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text ">Password</span>
                </label>
                <input
                  type="text"
                  name="password"
                  placeholder="password"
                  className="input input-ghost w-full max-w-xs"
                />
              </div>
              <Link to={"/"} className="label-text-alt link link-hover ">
                Already have an acount/login
              </Link>
              {error && (
                <p className="text-2xl text-red-500">{error?.message}</p>
              )}
              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value={"signup"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
