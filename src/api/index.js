import axios from "axios";
import moment from "moment";

//const url = "https://covid19.mathdro.id/api";

const url = "https://api.covidtracking.com";

export const fetchData = async ({ state, date }) => {
  let changeableUrl = url;
  console.log({ date });
  if (state && date) {
    const stateLower = state.toLowerCase();
    const dateFormat = moment(date).format("YYYYMMDD");
    console.log("dateFormat", dateFormat);
    changeableUrl = `${url}/v1/states/${stateLower}/${dateFormat}.json`;
  }

  try {
    const {
      data: { hospitalizedCurrently, recovered, death, lastUpdateEt },
    } = await axios.get(changeableUrl);
    // const {
    //   data: { deathConfirmed, recovered, deaths, lastUpdateEt },
    // } = await axios.get(changeableUrl);

    console.log(
      "hospitalizedCurrently, recovered, deaths, lastUpdateEt",
      hospitalizedCurrently,
      recovered,
      death,
      lastUpdateEt
    );

    return {
      confirmed: hospitalizedCurrently,
      recovered,
      deaths: death,
      lastUpdate: lastUpdateEt,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    // const { data } = await axios.get(`${url}/daily`);
    // const modifiedData = data.map((dailyData) => ({
    //   confirmed: dailyData.confirmed.total,
    //   deaths: dailyData.deaths.total,
    //   date: dailyData.reportDate,
    // }));
    // console.log({ data });

    const test = `${url}/v1/us/daily.json`;
    const { data } = await axios.get(test);
    const modifiedData = data.map((dailyData) => ({
      date: dailyData.date,
      deaths: dailyData.death,
      confirmed: dailyData.hospitalizedCurrently,
    }));
    console.log({ data });
    console.log({ modifiedData });

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
