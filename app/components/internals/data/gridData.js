import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

function renderStatus(status) {
  const colors = {
    Available: 'success',
    'Out of Stock': 'default',
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

export function renderAvatar(params) {
  if (params.value == null) {
    return '';
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: '24px',
        height: '24px',
        fontSize: '0.85rem',
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const columns = [
  { field: 'pageTitle', headerName: 'Product Name', flex: 1.5, minWidth: 200 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.5,
    minWidth: 80,
    renderCell: (params) => renderStatus(params.value),
  },
  {
    field: 'users',
    headerName: 'Staged',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'eventCount',
    headerName: 'In Inventory',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'viewsPerUser',
    headerName: 'Total',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'averageTime',
    headerName: 'Last updated by',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 100,
    sortable: false,
    filterable: false,
    disableExport: true,
    renderCell: (params) => (
      <>
        <IconButton
          color="primary"
          size="small"
          onClick={() => {
            console.log("Edit row:", params.row);
          }}
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          color="error"
          size="small"
          onClick={() => {
            console.log("Delete row:", params.row);
          }}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </>
    ),
  },
];
 
export const rows = [
  { id: 1, pageTitle: 'Chicken Adobo', status: 'Available', eventCount: 120, users: 32, viewsPerUser: 3.8, averageTime: '1m 20s' },
  { id: 2, pageTitle: 'Sinigang Mix (Tamarind)', status: 'Available', eventCount: 85, users: 28, viewsPerUser: 2.4, averageTime: '1m 45s' },
  { id: 3, pageTitle: 'Bangus (Milkfish)', status: 'Out of Stock', eventCount: 30, users: 15, viewsPerUser: 2.0, averageTime: '1m 30s' },
  { id: 4, pageTitle: 'Soy Sauce (Silver Swan)', status: 'Available', eventCount: 240, users: 60, viewsPerUser: 4.2, averageTime: '1m 10s' },
  { id: 5, pageTitle: 'Vinegar (Sukang Paombong)', status: 'Available', eventCount: 200, users: 52, viewsPerUser: 3.7, averageTime: '1m 15s' },
  { id: 6, pageTitle: 'Pancit Canton Noodles', status: 'Available', eventCount: 175, users: 49, viewsPerUser: 3.1, averageTime: '1m 25s' },
  { id: 7, pageTitle: 'Garlic Longganisa', status: 'Out of Stock', eventCount: 60, users: 22, viewsPerUser: 2.5, averageTime: '1m 40s' },
  { id: 8, pageTitle: 'Lumpia Wrappers', status: 'Available', eventCount: 90, users: 25, viewsPerUser: 2.8, averageTime: '1m 35s' },
  { id: 9, pageTitle: 'Kaldereta Sauce Mix', status: 'Available', eventCount: 65, users: 18, viewsPerUser: 2.3, averageTime: '1m 50s' },
  { id: 10, pageTitle: 'Bagoong (Shrimp Paste)', status: 'Available', eventCount: 105, users: 34, viewsPerUser: 3.5, averageTime: '1m 10s' },
  { id: 11, pageTitle: 'Tilapia', status: 'Out of Stock', eventCount: 45, users: 12, viewsPerUser: 2.1, averageTime: '1m 45s' },
  { id: 12, pageTitle: 'Banana Ketchup (Jufran)', status: 'Available', eventCount: 170, users: 50, viewsPerUser: 3.9, averageTime: '1m 15s' },
  { id: 13, pageTitle: 'Rice (Jasmine)', status: 'Available', eventCount: 400, users: 90, viewsPerUser: 4.4, averageTime: '1m 05s' },
  { id: 14, pageTitle: 'Toyo & Suka Pack', status: 'Available', eventCount: 160, users: 38, viewsPerUser: 3.2, averageTime: '1m 20s' },
  { id: 15, pageTitle: 'Fish Sauce (Patis)', status: 'Available', eventCount: 145, users: 30, viewsPerUser: 3.0, averageTime: '1m 18s' },
  { id: 16, pageTitle: 'Fresh Tomatoes', status: 'Available', eventCount: 210, users: 56, viewsPerUser: 3.6, averageTime: '1m 12s' },
  { id: 17, pageTitle: 'Green Papaya (for Tinola)', status: 'Out of Stock', eventCount: 35, users: 10, viewsPerUser: 1.8, averageTime: '1m 30s' },
  { id: 18, pageTitle: 'Eggplant (Tortang Talong)', status: 'Available', eventCount: 125, users: 33, viewsPerUser: 3.3, averageTime: '1m 22s' },
  { id: 19, pageTitle: 'Fresh Lumpia Ingredients', status: 'Available', eventCount: 85, users: 26, viewsPerUser: 3.0, averageTime: '1m 19s' },
  { id: 20, pageTitle: 'Chicharon', status: 'Available', eventCount: 195, users: 48, viewsPerUser: 4.1, averageTime: '1m 09s' },
];

