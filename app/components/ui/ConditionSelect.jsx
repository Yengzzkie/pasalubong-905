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

const conditions = [
  { text: 'New', value: 'NEW' },
  { text: 'Used - Like New', value: 'USED_LIKE_NEW' },
  { text: 'Used - Very Good', value: 'USED_VERY_GOOD' },
  { text: 'Used - Good', value: 'USED_GOOD' },
  { text: 'Used - Acceptable', value: 'USED_ACCEPTABLE' },
  { text: 'For Parts', value: 'FOR_PARTS' },
  { text: 'For Repair', value: 'FOR_REPAIR' },
  { text: 'For Scrap', value: 'FOR_SCRAP' },
  { text: 'For Recycling', value: 'FOR_RECYCLING' },
];

function getStyles(name, selectedValue, theme) {
  return {
    fontWeight: selectedValue === name
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function ConditionSelect({ condition, setCondition }) {
  const theme = useTheme();

  const handleChange = (event) => {
    setCondition(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="condition-label">Condition</InputLabel>
      <Select
        labelId="condition-label"
        id="condition-select"
        value={condition}
        onChange={handleChange}
        input={<OutlinedInput label="Condition" />}
        MenuProps={MenuProps}
      >
        {conditions.map((c) => (
          <MenuItem
            key={c.value}
            value={c.value}
            style={getStyles(c.value, condition, theme)}
          >
            {c.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
