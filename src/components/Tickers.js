import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  NativeSelect,
  OutlinedInput,
  Typography,
} from "@mui/material";

import Ticker from "./Ticker";

export default function Tickers({ currencies }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      inputMarket: "binance",
    },
  });

  const [inputMarket, setInputMarket] = useState([]);
  const [tickers, setTotalTickers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/exchanges/list"
      );

      if (response.ok) {
        const jsonData = await response.json();
        setInputMarket(jsonData);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${data.inputCurrency}/tickers?exchange_ids=${data.inputMarket}`;

    const response = await fetch(apiUrl);

    if (response.ok) {
      const jsonData = await response.json();
      const tickers = jsonData.tickers;

      setTotalTickers(tickers);
    }
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        mb="32px"
      >
        <div>
          <Typography
            component="label"
            variant="button"
            color="primary"
            sx={{ display: "block" }}
            htmlFor="amount"
          >
            Coin:
          </Typography>
          <NativeSelect
            sx={{ mr: "16px" }}
            input={<OutlinedInput />}
            {...register("inputCurrency")}
            defaultValue={"bitcoin"}
          >
            {currencies.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id}
              </option>
            ))}
          </NativeSelect>
        </div>
        <Box>
          <Typography
            component="label"
            variant="button"
            color="primary"
            htmlFor="amount"
            sx={{ display: "block" }}
          >
            Market:
          </Typography>
          <Box display="flex">
            <NativeSelect
              sx={{ mr: "16px" }}
              input={<OutlinedInput />}
              {...register("inputMarket")}
            >
              {inputMarket.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.id}
                </option>
              ))}
            </NativeSelect>
            <Button variant="submit" type="submit">
              Search
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          display="flex"
          flexDirection="column"
          component="ol"
          sx={{ listStyleType: "none" }}
        >
          {tickers.map((ticker, index) => (
            <Ticker key={index} ticker={ticker} />
          ))}
        </Box>
      </Box>
    </div>
  );
}
