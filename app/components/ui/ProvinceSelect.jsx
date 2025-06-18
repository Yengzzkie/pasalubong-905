import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const provinces = [
    "Ontario",
    "Quebec",
    "British Columbia",
    "Alberta",
    "Manitoba",
    "Saskatchewan",
    "Nova Scotia",
    "New Brunswick",
    "Prince Edward Island",
    "Newfoundland and Labrador",
    "Northwest Territories",
  ];

export default function ProvinceSelect({ location, setLocation }) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl required fullWidth>
        <InputLabel id="demo-simple-select-label">Province</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={location.province}
          label="Province"
          onChange={(e) => setLocation({ ...location, province: e.target.value })}
        >
          {provinces.map((province, index) => (
            <MenuItem key={index} value={province}>
              {province}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
