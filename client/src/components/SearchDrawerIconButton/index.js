// import from react
import { useState } from 'react';
// import components
import SearchDrawer from '../../components/SearchDrawer';
// import from mui
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "@mui/material";
// import from styles
import styles from './SearchDrawerIconButton.module.css';


const SearchDrawerIconButton = ( {handleDrawerClose}) => {
  const [isSearchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const handleOpenSearchDrawer = () => {
    setSearchDrawerOpen(true);
  };

  const handleCloseSearchDrawer = () => {
    setSearchDrawerOpen(false);
  };

  return (
    <>
      <SearchDrawer
        isOpen={isSearchDrawerOpen}
        onClose={handleCloseSearchDrawer}
        handleDrawerClose={handleDrawerClose}
      />
      <Link className={styles.searchButton} underline="none" component="button" onClick={handleOpenSearchDrawer}>
        <SearchIcon
          className={styles.searchButton}
          sx={{ marginBottom: "-.5rem", cursor: "pointer" }}
          // onClick={handleOpenSearchDrawer}
          fontSize="large"
        />
        <h6 className={styles.searchLabel} styles={{margin: '3rem'}}>Search</h6>
      </Link>
    </>
  );
};
export default SearchDrawerIconButton;

