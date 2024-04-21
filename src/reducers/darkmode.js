const DarkMode = (state = [], action) => {
  if (action.type === "GET_DARK_MODE") {
    state = action.data;
  }

  return state;
};

export default DarkMode;
