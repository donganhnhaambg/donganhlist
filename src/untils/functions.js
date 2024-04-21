export const setInforUser = (data) => {
  localStorage.setItem("data_info", JSON.stringify(data));
};

export const getInforUser = () => {
  let data_info = null;

  if (localStorage.getItem("data_info") !== "undefined") {
    data_info = JSON.parse(localStorage.getItem("data_info"));
  }
  return data_info;
};
export const logout = () => {
  if (localStorage.getItem("data_info") !== "undefined") {
    localStorage.removeItem("data_info");
  }
};
