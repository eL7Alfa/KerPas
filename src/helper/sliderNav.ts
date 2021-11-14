type args = {
  hList?: HTMLDivElement;
  breakpoint: number;
  length?: number;
  windowWidth?: number;
};

export const onPrev =
  ({ hList, breakpoint, length = 6, windowWidth = window.innerWidth }: args) =>
  () => {
    if (hList) {
      if (windowWidth > breakpoint) {
        hList.scrollTo({
          left: hList.scrollLeft - breakpoint,
          behavior: 'smooth',
        });
      } else {
        hList.scrollTo({
          left:
            hList.scrollLeft -
            Math.floor(windowWidth / (breakpoint / length)) *
              (breakpoint / length),
          behavior: 'smooth',
        });
      }
    }
  };

export const onNext =
  ({ hList, breakpoint, length = 6, windowWidth = window.innerWidth }: args) =>
  () => {
    if (hList) {
      if (windowWidth > breakpoint) {
        hList.scrollTo({
          left: hList.scrollLeft + breakpoint,
          behavior: 'smooth',
        });
      } else {
        hList.scrollTo({
          left:
            hList.scrollLeft +
            Math.floor(windowWidth / (breakpoint / length)) *
              (breakpoint / length),
          behavior: 'smooth',
        });
      }
    }
  };
