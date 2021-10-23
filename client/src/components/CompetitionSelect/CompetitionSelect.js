import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import MuiMenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from '@mui/material';

const MenuItem = withStyles({
  root: {
    justifyContent: "flex-start",
  }
})(MuiMenuItem);
export default function CompetitionSelect({competitionId , setCompetitionId}) {
  
  const handleChange = (event) => {
    setCompetitionId(event.target.value);
  };
  // console.log(competitionId);
  return (
    <>
    <Typography style={{marginBottom:10}}>Choose a competition</Typography> 
    <Box sx={{ minWidth: 120 }}>
       
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Competition</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={competitionId}
          label="Competiton"
          onChange={handleChange}
        >
          <MenuItem value={24}>UEFA Champions League</MenuItem>
          <MenuItem value={1}>Premier League</MenuItem>
          <MenuItem value={94}>Spanish La Liga</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </>
  );
}