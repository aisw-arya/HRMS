import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate()
  return (
    <Box sx={{ width: 1000 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
         
        <BottomNavigationAction onClick={() => navigate('/designation')} label="designation" /> 
        <BottomNavigationAction onClick={() => navigate('/addemployee')} label="Add employee" /> 
        {/* <BottomNavigationAction label="designation" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Add Designation" icon={<AddIcon />} /> */}
      </BottomNavigation>
    </Box>
  );
}