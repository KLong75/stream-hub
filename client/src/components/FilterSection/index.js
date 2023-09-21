
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Unstable_Grid2/Grid2";


const FilterSection = ({ title, items, filterState, handleChange }) => {
  return (
    <>
      <h5>{title}</h5>
      <Grid container spacing={1} >
      {items.map(item => (
        <Grid xs={3} key={item}>
        <FormControlLabel          
          control={
            <Checkbox
              checked={filterState[item]}
              onChange={handleChange}
              name={item}
            />   
          }
          label={item}
        />
        </Grid>
      ))}
      </Grid>
    </>
  );
};

export default FilterSection;