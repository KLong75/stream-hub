export const getSavedTitleIds = () => {
  const savedTitleIds = localStorage.getItem('saved_title_ids')
    ? JSON.parse(localStorage.getItem('saved_title_ids'))
    : [];

  return savedTitleIds;
};

export const saveTitleIds = (titleIdArr) => {
  if (titleIdArr.length) {
    localStorage.setItem('saved_title_ids', JSON.stringify(titleIdArr));
  } else {
    localStorage.removeItem('saved_title_ids');
  }
};

export const removeTitleId = (id) => {
  const savedTitleIds = localStorage.getItem('saved_title_ids')
    ? JSON.parse(localStorage.getItem('saved_title_ids'))
    : null;

  if (!savedTitleIds) {
    return false;
  }

  const updatedSavedTitleIds = savedTitleIds?.filter((id) => id);
  localStorage.setItem('saved_title_ids', JSON.stringify(updatedSavedTitleIds));

  return true;
};