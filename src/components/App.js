import * as React from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";

import Tickers from "./Tickers";
import Calculator from "./Calculator";

export default function App() {
  const [value, setValue] = useState("1");
  const [converterHistory, setConverterHistory] = useState([]);

  const [targetCurrencies, setTargetCurrencies] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
      );

      if (response.ok) {
        const jsonData = await response.json();
        setTargetCurrencies(jsonData);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/list"
      );

      if (response.ok) {
        const jsonData = await response.json();
        setCurrencies(jsonData);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
          >
            <Tab label="CRYTO CALCULATOR" value="1" />
            <Tab label="TICKERS" value="2" />
          </TabList>
        </Box>
        <Container maxWidth="lg">
          <TabPanel value="1">
            <Typography
              textTransform="uppercase"
              component="h1"
              variant="h1"
              color="primary"
              mb="75px"
            >
              Crypto Calculator
            </Typography>
            <Calculator
              targetCurrencies={targetCurrencies}
              currencies={currencies}
              history={converterHistory}
              addConversion={(conversion) =>
                setConverterHistory([conversion, ...converterHistory])
              }
            ></Calculator>
          </TabPanel>
          <TabPanel value="2">
            <Typography
              textTransform="uppercase"
              mb="75px"
              component="h1"
              variant="h1"
              color="primary"
            >
              Tickers
            </Typography>
            <Tickers currencies={currencies}></Tickers>
          </TabPanel>
        </Container>
      </TabContext>
    </Box>
  );
}
