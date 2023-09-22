
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Unstable_Grid2/Grid2";


const FilterSection = ({ title, items, filterState, handleChange }) => {

  const displayLabels = {
    ActionAdventure: "Action & Adventure",
  };

  return (
    <>
      <h5>{title}</h5>
      <Grid container spacing={1} >
      {items.map(item => (
        <Grid xs={6} md={4} key={item}>
        <FormControlLabel          
          control={
            <Checkbox
              checked={filterState[item]}
              onChange={handleChange}
              name={item}
            />   
          }
          label={displayLabels[item] || item}
        />
        </Grid>
      ))}
      </Grid>
    </>
  );
};

export default FilterSection;