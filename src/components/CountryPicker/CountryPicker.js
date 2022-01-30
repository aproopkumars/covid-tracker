import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import "./CountryPicker.css";
import TextField from "@mui/material/TextField";
import { fetchCountries } from "../../api";
import { states } from "../constants";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

const CountryPicker = ({ handleCountryChange, handleDateChange }) => {
  // const [fetchedCountries, setFetchedCountries] = useState([]);

  // useEffect(() => {
  //   const fetchAPI = async () => {
  //     setFetchedCountries(await fetchCountries());
  //   };

  //   fetchAPI();
  // }, [setFetchedCountries]);

  // const fetchAPI = async () => {
  //   setFetchedCountries(await fetchCountries());
  // };
  console.log({ states });

  return (
    <div className="formControl">
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">US</option>
        {states.map((state, i) => (
          <option key={i} value={state.code}>
            {state.name}
          </option>
        ))}
      </NativeSelect>
      <TextField
        className="datePicker"
        id="date"
        label="date range"
        type="date"
        defaultValue="2017-05-24"
        onChange={(e) => handleDateChange(e.target.value)}
        sx={{ width: 220, paddingLeft: 1, paddingBottom: 2 }}
      />
    </div>
  );
};

export default CountryPicker;
