import {
  Button,
  NativeSelect,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import arrow from "../assets/arrow-to.svg";

export default function Calculator({
  history,
  addConversion,
  targetCurrencies,
  currencies,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${data.inputCurrency}&vs_currencies=${data.targetCurrency}`;

    const response = await fetch(apiUrl);

    if (response.ok) {
      const jsonData = await response.json();
      const value = jsonData[data.inputCurrency][data.targetCurrency];

      const convert = data.amount * value;
      const roundedConvert = Math.round(convert);
      const result = {
        amount: data.amount,
        inputCurrency: data.inputCurrency,
        targetCurrency: data.targetCurrency,
        value: value,
        convert: roundedConvert,
      };

      addConversion(result);
    }
  };

  return (
    <div>
      <Box
        component="form"
        display="flex"
        justifyContent="center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box display="flex">
          <div>
            <Typography
              component="label"
              variant="button"
              color="primary"
              htmlFor="amount"
            >
              From:
            </Typography>
            <Box display="flex">
              <Box sx={{ mr: "16px" }}>
                <TextField
                  id="amount"
                  {...register("amount", {
                    required: "Required field",
                    valueAsNumber: true,
                    pattern: "[0-9.]*",
                  })}
                  inputProps={{
                    sx: {
                      textAlign: "right",
                      fontWeight: "bold",
                    },
                  }}
                  autoFocus
                />
                <p>{errors.amount?.message}</p>
              </Box>
              <NativeSelect
                input={<OutlinedInput />}
                {...register("inputCurrency", { required: true })}
              >
                {currencies.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.id}
                  </option>
                ))}
              </NativeSelect>
            </Box>
          </div>
          <Box component="img" mx="10px" src={arrow} />
          <div>
            <Typography
              component="label"
              variant="button"
              color="primary"
              htmlFor="amount"
            >
              To:
            </Typography>{" "}
            <Box display="flex">
              <NativeSelect
                input={<OutlinedInput />}
                {...register("targetCurrency", { required: true })}
                sx={{ mr: "16px" }}
              >
                {targetCurrencies.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </NativeSelect>
              <Button variant="submit" type="submit">
                Convert
              </Button>
            </Box>
          </div>
        </Box>
      </Box>
      {history.length > 0 && (
        <Box textAlign="center">
          <Typography sx={{ color: " #21639C" }}>Result</Typography>
          <Box component="ol" sx={{ listStyleType: "none" }}>
            {history.map((result, index) => (
              <Box
                component="li"
                sx={index === 0 ? { fontSize: 40 } : { color: "#5F5F5B" }}
                key={index}
              >
                <strong>
                  {result.amount} {result.inputCurrency}{" "}
                </strong>
                is worth
                <strong>
                  {" "}
                  {result.convert} {result.targetCurrency}{" "}
                </strong>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </div>
  );
}
