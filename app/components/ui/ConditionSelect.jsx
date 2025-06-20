import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  { text: 'Pork', value: 'PORK' },
  { text: 'Chicken', value: 'CHICKEN' },
  { text: 'Vegetable', value: 'VEGETABLE' },
  { text: 'Beef', value: 'BEEF' },
  { text: 'Seafood', value: 'SEAFOOD' }
];

function getStyles(name, selectedValue, theme) {
  return {
    fontWeight: selectedValue === name
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function ConditionSelect({ category, setCategory }) {
  const theme = useTheme();

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="category-label">Category</InputLabel>
      <Select
        labelId="category-label"
        id="category-select"
        value={category}
        onChange={handleChange}
        input={<OutlinedInput label="Category" />}
        MenuProps={MenuProps}
      >
        {categories.map((c) => (
          <MenuItem
            key={c.value}
            value={c.value}
            style={getStyles(c.value, category, theme)}
          >
            {c.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
