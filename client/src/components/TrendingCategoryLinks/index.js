import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Link } from "@mui/material";


const TrendingCategoryLinks = () => {

  return (

    <Grid container  justifyContent='center' spacing={2} sx={{marginTop: '.25rem'}} textAlign='center'>
      <Grid lg={1}></Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <Link href="#Trending Movies" underline="none" sx={{color: "black"}}>
          Trending Movies
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <Link href="#Top Rated Movies" underline="none" sx={{color: 'black'}}>
        Top Rated Movies
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <Link href="#Trending TV Shows" underline="none" sx={{color: 'black'}}>
        Trending TV 
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <Link href="#Top Rated TV Shows" underline="none" sx={{color: 'black'}}>
        Top Rated TV
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <Link href="#Coming Soon" underline="none" >
        Coming Soon
        </Link>
      </Grid>  
      <Grid lg={1}></Grid>
    </Grid>

  )


};
export default TrendingCategoryLinks;