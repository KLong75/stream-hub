import React from "react";

import { Link, useParams } from "react-router-dom";

import Auth from "../../utils/auth";

import { useQuery, useMutation } from "@apollo/client";

import { QUERY_ME } from "../../utils/queries";

import { REMOVE_TITLE } from "../../utils/mutations";

import { Button } from "@mui/material";

import { useTitleSelection } from "../../utils/useTitleSelection";

const WatchList = () => {
  const loggedIn = Auth.loggedIn();
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_ME : QUERY_ME, {
    variables: { username: userParam },
  });
  const userData = data?.me || {};
  const handleTitleSelected = useTitleSelection();
  const [removeTitle] = useMutation(REMOVE_TITLE);

  const handleDeleteTitle = async (id) => {
    console.log(id);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await removeTitle({
        variables: { id: id },
        update: (cache) => {
          const data = cache.readQuery({ query: QUERY_ME });

          // Create a deep copy of the data
          const newData = JSON.parse(JSON.stringify(data));

          // Update the copy, not the original data
          newData.me.savedTitles = newData.me.savedTitles.filter(
            (title) => title.id !== id
          );

          // Write the updated data back to the cache
          cache.writeQuery({ query: QUERY_ME, data: newData });
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {loggedIn ? (
        <>
          <h4>{userData.username}'s Watchlist</h4>
          <div className="watchlist">
            <h5>
              {userData.savedTitles.length
                ? `You have ${userData.savedTitles.length} saved ${
                    userData.savedTitles.length === 1 ? "title" : "titles"
                  }:`
                : "You have no saved titles!"}
            </h5>
            {userData.savedTitles?.map((title) => {
              return (
                <div className="watchlist-item" key={title.id}>
                  <div className="watchlist-item-title">
                    <h5>{title.title}</h5>
                    <p>{title.year}</p>
                    <img src={title.poster} alt={title.title} />
                    <p>{title.genre_names}</p>
                    <p>{title.type}</p>
                    <p>{title.plot_overview}</p>
                    <img src={title.backdrop} alt={title.title} />
                    <div>
                      {title.sources && title.sources.length > 0 && (
                        <>
                          <p>Watch On:</p>
                          {title.sources.map((source) => {
                            //const keyVal = `${title.id}-${source.source_id}`;
                            //console.log("Source Key: ", keyVal);
                            return (
                              <div key={`${title.id}-${source.source_id}`}>
                                <a
                                  href={source.web_url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <p>{source.name}</p>
                                </a>
                              </div>
                            );
                          })}
                        </>
                      )}
                    </div>
                    <div>
                      {title.buy_sources && title.buy_sources.length > 0 && (
                        <>
                          <p>Rent or buy on:</p>
                          {title.buy_sources.map((buy_source) => {
                            //const keyVal = `${title.id}-${buy_source.source_id}`;
                            //console.log("Buy Source Key: ", keyVal);
                            return (
                              <div key={`${title.id}-${buy_source.source_id}`}>
                                <a
                                  href={buy_source.web_url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <p>{buy_source.name}</p>
                                </a>
                              </div>
                            );
                          })}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="watchlist-item-buttons">
                    <Button 
                      variant='contained'
                      onClick={() => handleDeleteTitle(title.id)}>
                      Remove
                    </Button>
                    <Button
                      variant="contained"
                      value={title.id}
                      onClick={handleTitleSelected}
                    >
                      More Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <h2>Welcome to streamHub</h2>
          <p>Please</p>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <br />
          <p>Or</p>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </>
      )}
    </>
  );
};

export default WatchList;
