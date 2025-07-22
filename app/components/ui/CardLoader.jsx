import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

export default function CardLoader() {

  return (
    <Card sx={{ maxWidth: "100%", m: 2 }}>
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />

      <CardContent>
        <React.Fragment>
          <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={15} width="80%" />
        </React.Fragment>
      </CardContent>
    </Card>
  );
}
