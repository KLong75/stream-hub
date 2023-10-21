import styles from "./TVButton.module.css";

const TVButton = ({
  modalType,
  setModal,
  type,
  children,
  iconSrc,
  ...otherProps
}) => {
  const handleClick = () => {
    setModal(type);
  };

  return (
    <button
      className={styles.tvButton}
      onClick={handleClick}
      style={{}}
      {...otherProps}
    >
      {modalType === type ? (
        <span style={{ visibility: "hidden" }}>{children}</span>
      ) : (
        children
      )}
      {/* Render icon if iconSrc prop is provided */}
      {iconSrc && (     
        <img
        className={styles.tvIcon}
          src={iconSrc}
          alt="tv icon"
        />     
      )}
    </button>
  );
};

export default TVButton;
