import React, { useEffect, useState } from "react";
import "./Home.css";
import icon from "../Image/anonymous.jpg";
import { signOut } from "firebase/auth";
import auth from "../Authentication/Firebase.init";

const Home = () => {
  const [userText, setUserData] = useState([]);
  const [userName, setUserName] = useState(null);
  const post = (event) => {
    event.preventDefault();
    const text = event.target.text.value;
    fetch("http://localhost:5000/post", {
      method: "POST",
      body: JSON.stringify({
        text: text,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.acknowledged === true) {
          const input = document.getElementById("input");
          input.value = "";
        }
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/alltext")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      });
  }, [userText]);

// sign out 
  const signout = () => {
    signOut(auth);
  }

  return (
    <div className="bg-black ">
      {/* {userName === null && (
        <input
          type="submit"
          className="bg-slate-500 p-2 rounded-xl h-10 ml-2 border-white border-2"
          value={"SEND"}
        />
      )} */}
      <div className="flex ">
        <div className="flex mx-5 mb-5">
          <img
            src={icon}
            className="lg:h-20 h-10 w-10 lg:w-20 rounded-[50%] border-white border-4"
            alt=""
          />
          <h1 className="ml-5 font-sans font-bold lg:text-5xl text-3xl text-white ">
            Be a anonymous
          </h1>
        </div>
        <div className="ml-auto m-3">
          <button onClick={signout} className="text-white btn btn-sm">sign out</button>
        </div>
      </div>
      <div className=" h-[600px] lg:mx-10 mx-3 p-1 rounded-xl scroll">
        {userText.map((text, index) => (
          <div key={text._id}>
            <h1 className="bg-black w-[75%] border-white border-2 text-white m-1 p-1 rounded-xl">
              {text.text}
            </h1>
            {/* <h1 className="bg-black ml-auto w-[75%] border-black border-2 text-black bg-white m-1 p-1 rounded-xl">
              {text.text}
            </h1> */}
          </div>
        ))}
      </div>
      <div>
        <form className="mx-10 p-2 rounded-xl flex" onSubmit={post}>
          <textarea
            type="text"
            id="input"
            className="w-full  bg-slate-800 px-5 py-3 rounded-xl border-2 border-white text-white"
            placeholder="write text ...."
            name="text"
          />
          <input
            type="submit"
            className="bg-slate-500 p-2 rounded-xl h-10 ml-2 border-white border-2"
            value={"SEND"}
          />
        </form>
      </div>
    </div>
  );
};

export default Home;
