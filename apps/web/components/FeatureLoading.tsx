import * as React from 'react';
import { Box, CircularProgress, Grid, Paper } from '@mui/material';

export default function FeatureLoading() {
  return (
    <Grid>
      <Paper
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '200px',
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <CircularProgress />
      </Paper>
    </Grid>
  );
}
