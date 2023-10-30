// import from mui
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const SourceLink = ({ url, logoSrc, altText }) => {
  if (!url) {
    return null;
  }

  return (
    <Grid xs={12} sx={{ height: "3.5rem", overflow: "hidden" }}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img
          style={{
            maxWidth: "6rem",
            maxHeight: "auto",
            display: "block",
            margin: "0 auto",
          }}
          src={logoSrc}
          alt={altText}
        />
      </a>
    </Grid>
  );
};

export default SourceLink;
