import React, { useEffect, useState } from "react";
import { fetchData } from "./api";
import "./App.css";
import { Cards, Chart, PickerTemplate, LoginForm } from "./components";

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123",
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [data, setData] = useState({});
  const [state, setState] = useState("");
  const [date, setDate] = useState("");

  const Login = (details) => {
    console.log(details);
    if (
      details.email === adminUser.email &&
      details.password === adminUser.password
    ) {
      console.log("Logged in");
      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
      console.log("Credentials do not match");
      setError("Credentials do not match");
    }
  };

  const Logout = () => {
    setUser({
      name: "",
      email: "",
    });
    console.log("Logout");
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchData());
    };

    fetchAPI();
  }, []);

  const handleCountryChange = async (state) => {
    setState(state);
    if (state !== null && date !== null) {
      const fetchedData = await fetchData({ state, date });
      setData(fetchedData);
    }
  };

  const handleDateChange = async (date) => {
    setDate(date);
    if (state !== null && date !== null) {
      const fetchedData = await fetchData({ state, date });
      setData(fetchedData);
    }
  };

  return (
    <div className="App">
      {user.email !== "" ? (
        <div className="container">
          {console.log({ data })}
          <Cards data={data} />
          <PickerTemplate
            handleCountryChange={handleCountryChange}
            handleDateChange={handleDateChange}
          />
          <Chart data={data} state={state} />
          {/* <h2>
           {" "}
           welcome, <span>{user.name}</span>
         </h2> */}
          {/* <button onClick={Logout}>Logout</button> */}
        </div>
      ) : (
        <div className="loginForm">
          <LoginForm Login={Login} error={error} />
        </div>
      )}
    </div>
  );
}

export default App;
