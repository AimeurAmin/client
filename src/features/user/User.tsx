import React from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginAsync, selectUser } from "./userSlice";
import { useSelector } from 'react-redux';

const User = () => {
  const dispatch = useAppDispatch();
  const userInformation = useSelector(selectUser);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  return (
    <div>
      {userInformation.status === "pending" && <p>pending</p>}
      {userInformation.status !== "pending" && (
        <div>
          <p>Name: {userInformation.userData.user.name}</p>
          <p>Email: {userInformation.userData.user.email}</p>
          <p>
            Confirmed:{" "}
            {userInformation.userData.user.confirmed
              ? "confirmed"
              : "not confirmed"}
          </p>
          <p>Age: {userInformation.userData.user.age}</p>
        </div>
      )}
      <input
        type="text"
        placeholder="Email"
        value={user.email}
        onChange={(e) =>
          setUser({ email: e.target.value, password: user.password })
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) =>
          setUser({ email: user.email, password: e.target.value })
        }
      />
      <button
        onClick={() =>
          dispatch(
            loginAsync({
              email: user.email,
              password: user.password,
            })
          )
        }
      >
        Login
      </button>
    </div>
  );
};

export default User;
