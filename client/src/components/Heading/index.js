// import from mui
import Grid from "@mui/material/Unstable_Grid2";
import styles from '../Heading/Heading.module.css';

const Heading = ({heading, subHeading, variant = 'h1'}) => {

  const variants = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
  };

  const PrimaryTag = variants[variant] || "h1";
  const SecondaryTag = variants[`h${parseInt(variant[1], 10) + 1}`] || "h2";
  
  return (
    <Grid container>
      <Grid xs={12} display="flex" justifyContent="center" textAlign="center" alignItems="center">
      <PrimaryTag className={styles.heading}>{heading}</PrimaryTag>
      </Grid>
      {subHeading && (
      <Grid xs={12} display="flex" justifyContent="center" textAlign="center" alignItems="center">
      <SecondaryTag className={styles.subHeading}>{subHeading}</SecondaryTag>
      </Grid>
      )}
    </Grid>
  );
};

export default Heading;
