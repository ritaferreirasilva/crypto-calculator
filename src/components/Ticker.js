import { Box, Typography, Link } from "@mui/material";
import { format } from "date-fns";

export default function Ticker({ ticker }) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      component="li"
      sx={{
        border: "1px solid #E0E0D7",
        boxShadow: "inset 1px 1px 0 0 rgba(255,255,255,0.80)",
        borderRadius: "4px",
        background: "white",
        paddingX: "32px",
        paddingY: "24px",
        marginBottom: "14px",
      }}
    >
      <Box display="flex" flexDirection="column">
        {" "}
        <Typography
          sx={{
            fontSize: "32px",
            color: "#454B51",
            lineHeight: "32px",
            mb: "16px",
          }}
        >
          <strong>
            {ticker.base}/{ticker.target}
          </strong>
        </Typography>
        <Typography>
          {" "}
          <strong>Last Value:</strong> {ticker.last}
        </Typography>
        <Typography>
          {" "}
          <strong>Last Trade:</strong>{" "}
          {format(new Date(ticker.last_traded_at), "dd LLL yyyy, hh:mm")}
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"} textAlign={"right"}>
        <Link target="_blank" href={ticker.trade_url} sx={{ pb: "32px" }}>
          View more
        </Link>
        <Typography>
          <strong>Market:</strong> {ticker.market.name}
        </Typography>
        <Typography>
          {" "}
          <strong>Market Volume:</strong> {ticker.volume}{" "}
        </Typography>
      </Box>
    </Box>
  );
}
