export const isAuthenticated = () => {
  const user =
    JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).user ||
    null;

  if (Object.keys(user).length !== 0) {
    return true;
  } else {
    return false;
  }
};
