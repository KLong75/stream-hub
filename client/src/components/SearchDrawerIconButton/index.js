// import from react
import { useState } from 'react';
// import components
import SearchDrawer from '../../components/SearchDrawer';
// import from mui
import { Link } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import from styles
import styles from './SearchDrawerIconButton.module.css';


const SearchDrawerIconButton = () => {
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
      />
      <Link className={styles.searchButton} underline="none" component="button" onClick={handleOpenSearchDrawer}>
        <SearchIcon
          sx={{ marginBottom: "-1.85rem" }}
          onClick={handleOpenSearchDrawer}
          fontSize="large"
        />
        <h6>Search</h6>
      </Link>
    </>
  );
};
export default SearchDrawerIconButton;

