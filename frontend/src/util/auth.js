
export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token;
};


//todo: add writing token fn