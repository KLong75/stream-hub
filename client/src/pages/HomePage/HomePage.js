import { useEffect }from "react";
import { useParams, useNavigate } from "react-router-dom";
// import components
import WatchList from "../../components/WatchList";
import LoadingClapboard from "../../components/LoadingClapBoard";
import WhatsHotGallery from "../../components/WhatsHotGallery";
import CategoryLinks from "../../components/CategoryLinks";
// import from utils
import Auth from "../../utils/auth";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";



import styles from "./HomePage.module.css";


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
    <main>
      <CategoryLinks />      
      <h2 className={styles.greeting}>Welcome back {user.username}</h2>
        <section style={{marginTop: '0rem', marginBottom: '0rem'}}>
          <WatchList  />
        </section>
        <section style={{marginTop: '-4rem'}}>
          <WhatsHotGallery />
        </section> 
    </main>
  );
};

export default HomePage;
