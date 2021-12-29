let getScrollPosition = null;

export const scrollPosition = () => {
  getScrollPosition = window.pageYOffset;
  return getScrollPosition;
};

export const scrollBottom = () => {
  window.scrollTo({
    top: getScrollPosition,
  });
};
