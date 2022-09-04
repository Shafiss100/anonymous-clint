import React, { useState } from "react";
// import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "./Firebase.init";

const Login = () => {
  const navigare = useNavigate();
  const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, users, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [user, userLoading, userError] = useAuthState(auth);

  if (user) {
    fetch("http://localhost:5000/user", {
      method: "POST",
      body: JSON.stringify({
        userName: user.displayName,
        email: user.email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigare("/");
      });
  }

  // send user name and email to the database ;
  // if (user) {
  //   fetch('http://localhost:5000/user', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       userName: user.displayName,
  //       email: user.email,
  //     }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data)
  //       navigare("/")
  //       console.log("done")
  //     });

  // }

  // login with google (react firebase hoook)
  const glogin = () => {
    signInWithGoogle()
      .then(async () => {
        // send user name and email to the database ;
        const p = await user;
        if (p) {
          console.log(user);
          fetch("http://localhost:5000/user", {
            method: "POST",
            body: JSON.stringify({
              displayName: user.displayName,
              email: user.email,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              navigare("/");
            });
        }
      })
      .catch((error) => {
        console.log(error.message);
        navigare("/");
      });
  };

  // login from the form (email and password)
  const elogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(email, password)
      .then(() => {
        if (user) {
          navigare("/");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <form onSubmit={elogin}>
      <div className="hero min-h-screen login-page">
        <div>
          <div className="card w-full min-w-lg shadow-2xl ">
            <div className="card-body w-96 login-box">
              <h1 className="text-4xl ">Please Login</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text ">Email</span>
                </label>
                <input
                  type="text"
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
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover ">
                    Forgot password?
                  </a>
                </label>
                <label className="label">
                  <Link
                    to="/signup"
                    className="label-text-alt link link-hover "
                  >
                    create a new acount/signup
                  </Link>
                </label>
                {error && (
                  <p className="text-2xl text-red-500">{error.message}</p>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn  btn-primary"
                  value={"Login"}
                />
                <div className="login-icons">
                  <button onClick={glogin} className="btn btn-primary m-5">
                    continue Google{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
