const scrollBottom = () => {
  let offsetHeight = document.documentElement.offsetHeight - 965;
  window.scrollTo({
    top: offsetHeight,
    behavior: 'smooth',
  });
};

export default scrollBottom;
