// import from mui
import Grid from "@mui/material/Unstable_Grid2/Grid2";


const SourceLink = ({ url, logoSrc, altText }) => {
  if (!url) {
    return null;
  }

  return (
    <Grid xs={12}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img style={{ height: "4rem" }} src={logoSrc} alt={altText} />
      </a>
    </Grid>
  );
};

export default SourceLink;