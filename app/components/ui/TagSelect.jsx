import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function TagSelect({ tags, setTags }) {
  const theme = useTheme();
  const [inputValue, setInputValue] = React.useState('');
  const [error, setError] = React.useState("");

  const handleKeyDown = (event) => {
    setError("");

    if ((event.key === 'Enter' || event.key === ',') && inputValue.trim() !== '') {
      event.preventDefault();

      if (tags.length >= 6) {
        setError("Maximum of 6 tags are allowed")
        return
      }

      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  const handleDelete = (tagToDelete) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToDelete));
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <TextField
        label="Tags (Optional)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Typography component="span" sx={{ color: "red", fontSize: "14px" }}>{error}</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onDelete={() => handleDelete(tag)}
            deleteIcon={
              <IconButton size="small" sx={{ color: theme.palette.grey[500] }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />
        ))}
      </Box>
    </FormControl>
  );
}
