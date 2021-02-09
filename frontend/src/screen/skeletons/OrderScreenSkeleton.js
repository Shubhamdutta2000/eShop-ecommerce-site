import React from "react";

import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const OrderScreenSkeleton = () => {
  return (
    <>
      <Skeleton
        className="mt-4"
        width={600}
        height={60}
        variant="text"
        component="h2"
      />
      <Grid className="mt-3" container spacing={4}>
        <Grid item md={8} xs={12}>
          <Skeleton variant="rect" height={500} />
          <Skeleton className="mt-4" variant="rect" height={200} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Skeleton variant="rect" height={360} />
        </Grid>
      </Grid>
    </>
  );
};

export default OrderScreenSkeleton;
