export const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
}

const initializeTheme = () => {
  var currentTheme = localStorage.getItem("isdark");
  if (currentTheme === "true") {
      setTheme("dark");
      console.log("Theme set to dark");
  } else {
      setTheme("mytheme");
      console.log("Theme set to light");
  }
  console.log("Current Theme = ", currentTheme);
};

initializeTheme();
