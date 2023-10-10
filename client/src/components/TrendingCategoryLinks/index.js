import Grid from "@mui/material/Unstable_Grid2/Grid2";

const TrendingCategoryLinks = () => {
  return (
    <div className="category-links-container">
      <Grid
        container
        justifyContent="center"
        spacing={2}
        sx={{ marginTop: ".25rem" }}
        textAlign="center">
        <Grid md={0} lg={1}></Grid>
        <Grid sm={6} md={4} lg={2}>
          <a className="category-links" href="#Trending Movies">
            Trending Movies
          </a>
        </Grid>
        <Grid sm={6} md={4} lg={2}>
          <a className="category-links" href="#Top Rated Movies">
            Top Rated Movies
          </a>
        </Grid>
        <Grid sm={6} md={4} lg={2}>
          <a href="#Trending TV Shows" className="category-links">
            Trending TV
          </a>
        </Grid>
        <Grid sm={6} md={4} lg={2}>
          <a href="#Top Rated TV Shows" className="category-links">
            Top Rated TV
          </a>
        </Grid>
        <Grid sm={6} md={4} lg={2}>
          <a href="#Coming Soon" className="category-links">
            Coming Soon
          </a>
        </Grid>
        <Grid md={0} lg={1}></Grid>
      </Grid>
    </div>
  );
};
export default TrendingCategoryLinks;
