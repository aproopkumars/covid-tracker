import axios from "axios";
import moment from "moment";

const url = "https://api.covidtracking.com";

export const fetchData = async ({ state, date }) => {
  let changeableUrl = url;
  const defaultRequestBody = {
    status: "",
    hospitalized: 0,
    recovered: 0,
    deaths: 0,
    lastUpdate: 0,
  };

  if (!moment(date).isBetween("2020-01-13", "2021-03-07")) {
    console.log({ date });
    return {
      ...defaultRequestBody,
      status: {
        error: true,
        body: "Date selected should be in range between 2021-03-07 - 2020-01-13",
      },
    };
  }

  if (state && date) {
    const stateLower = state.toLowerCase();
    const dateFormat = moment(date).format("YYYYMMDD");
    console.log("dateFormat", dateFormat);
    changeableUrl = `${url}/v1/states/${stateLower}/${dateFormat}.json`;
    console.log({ date });
  }

  try {
    const {
      data: { hospitalizedCurrently, recovered, death, lastUpdateEt, error },
    } = await axios.get(changeableUrl);

    if (error) {
      return {
        ...defaultRequestBody,
        status: { error: true, body: "No records available" },
      };
    }

    return {
      hospitalized: hospitalizedCurrently || 0,
      recovered: recovered || 0,
      deaths: death || 0,
      lastUpdate: lastUpdateEt || 0,
    };
  } catch (error) {
    console.log(error);
    return defaultRequestBody;
  }
};

export const fetchDailyData = async () => {
  try {
    const test = `${url}/v1/us/daily.json`;
    const { data } = await axios.get(test);

    const modifiedData = data.map((dailyData) => ({
      date: dailyData.date,
      deaths: dailyData.death,
      hospitalized: dailyData.hospitalizedCurrently,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};
