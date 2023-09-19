// import from mui
import Grid from "@mui/material/Unstable_Grid2";


const Heading = ({heading, subHeading, variant = 'h2'}) => {

  const variants = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
  };

  const PrimaryTag = variants[variant] || "h2";
  const SecondaryTag = variants[`h${parseInt(variant[1], 10) + 1}`] || "h3";
  
  return (
    <Grid container>
      <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
      <PrimaryTag>{heading}</PrimaryTag>
      </Grid>
      {subHeading && (
      <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
      <SecondaryTag>{subHeading}</SecondaryTag>
      </Grid>
      )}
    </Grid>
  );
};

export default Heading;
