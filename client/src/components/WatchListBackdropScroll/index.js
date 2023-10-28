// import from @apollo/client
import { useQuery } from "@apollo/client";
// import from react-router-dom
import { useParams } from "react-router-dom";
// import from utils
import { QUERY_ME } from "../../utils/queries";
import { useTitleSelection } from "../../utils/useTitleSelection";
// import from mui
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import ButtonBase from '@mui/material/ButtonBase';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
// import swiper modules
import { Autoplay } from "swiper/modules";



export default function WatchListBackdropScroll() {
  const { username: userParam } = useParams();
  const { data } = useQuery(userParam ? QUERY_ME : QUERY_ME, {
    variables: { username: userParam },
  });
  const userData = data?.me || {};
  // console.log(userData)
  const handleTitleSelected = useTitleSelection();

  return (
    <>
      <Swiper
        speed={1000}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={3}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay]}
        className="mySwiper">
        {userData.savedTitles.map((title) => (
          <SwiperSlide key={title.id}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              textAlign="center">
              <Grid xs={12}>      
              <ButtonBase onClick={(event) => handleTitleSelected(title.id, event)} >
                <img
                  style={{ width: "80%", height: "auto" }}
                  src={title.backdrop}
                  alt={title.title}>
                </img>
              </ButtonBase>
                {/* <h2 style={{fontFamily: 'Raleway', fontSize:'.95rem', marginTop: '0'}}>{title.title}</h2> */}
              </Grid>
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
