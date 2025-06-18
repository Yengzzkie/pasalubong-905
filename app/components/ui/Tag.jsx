import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function Tag({ data }) {
  return (
    <Stack direction="row" spacing={.5} sx={{ flexWrap: "wrap", rowGap: "4px" }}>
      {data.map((tag, index) => (
        <Chip key={index} label={tag} size="small" sx={{ fontSize: "10px", p: "0px !important" }} />
      ))}
    </Stack>
  );
}
