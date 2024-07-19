import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import Form from '../pages/AddEmployee';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 1000 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
         
        <BottomNavigationAction label="Add Employee" icon={<AddIcon />}/> 
        <BottomNavigationAction label="designation" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Add Designation" icon={<AddIcon />} />
      </BottomNavigation>
    </Box>
  );
}