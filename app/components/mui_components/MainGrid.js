"use client"
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomizedDataGrid from './CustomizedDataGrid';
import StatCard from './StatCard';

const data = [
  {
    title: 'Employees',
    value: '14k',
    bg: 'linear-gradient(135deg, #E0ECFF 0%, #B6D4FE 100%)', // Subtle blue
  },
  {
    title: 'Products',
    value: '325',
    bg: 'linear-gradient(135deg, #FFF9DB 0%, #FCEFC7 100%)', // Soft yellow
  },
  {
    title: 'Other Products',
    value: '200k',
    bg: 'linear-gradient(135deg, #FFE5E5 0%, #F8CFCF 100%)', // Muted red
  },
];

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>
      {/* Table */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Inventory Overview
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid />
        </Grid>
      </Grid>
    </Box>
  );
}
