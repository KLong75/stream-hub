import { useEffect }from "react";
import { useParams, useNavigate } from "react-router-dom";
// import components
import WatchList from "../../components/WatchList";
import LoadingClapboard from "../../components/LoadingClapBoard";
import Heading from "../../components/Heading";
import TrendingMovies from "../../components/TrendingMovies";

import Auth from "../../utils/auth";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

// import styles from "./HomePage.module.css";


const HomePage = () => {
  const loggedIn = Auth.loggedIn();
  const navigate = useNavigate();

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_ME : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || {};

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  if (loading) {
    return (
      <div>
        Loading...
        <LoadingClapboard />
      </div>);
  }

  return (
    <>
        <>
        <Heading heading={`Welcome back ${user.username}`} subHeading={''} variant='h2'/>
          <section>
            <WatchList />
            <TrendingMovies />
          </section>
        </>
    </>
  );
};

export default HomePage;
