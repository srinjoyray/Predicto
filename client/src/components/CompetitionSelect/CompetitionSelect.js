import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import MuiMenuItem from "@material-ui/core/MenuItem";
import { withStyles,makeStyles } from "@material-ui/core/styles";
import { Typography } from '@mui/material';

import './CompetitionSelect.css';
import { ClassNames } from '@emotion/react';

const useStyles = makeStyles({
  label: {
    color: "wheat",
    "&.Mui-focused": {
      color: "wheat",
    },
  },
  select: {
    "&:after": {
      borderBottomColor: "wheat",
    },
    "& .MuiSvgIcon-root": {
      color: "wheat",
    },
    color:"wheat !important",
  },

});
const MenuItem = withStyles({
  root: {
    justifyContent: "flex-start",
    margin:'0px',
  },
  
})(MuiMenuItem);
export default function CompetitionSelect({competitionId , setCompetitionId}) {
  
  const classes = useStyles();

  const handleChange = (event) => {
    setCompetitionId(event.target.value);
  };
  
  return (
    <>
    
    <Box sx={{ minWidth: 120 }}>
       
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" className="competition-select-input-label">Competition</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={competitionId}
          label="Competiton"
          onChange={handleChange}
          className={classes.select}
        >
          <MenuItem value={1} >Premier League</MenuItem>
          <MenuItem value={94} >Spanish La Liga</MenuItem>
          <MenuItem value={24} >UEFA Champions League</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </>
  );
}