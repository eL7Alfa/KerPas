type args = {
  hList?: HTMLDivElement;
  breakpoint: number;
  length?: number;
  widthOffset?: number;
};

export const onPrev =
  ({ hList, breakpoint, length = 6, widthOffset = 0 }: args) =>
  () => {
    if (hList) {
      if (window.innerWidth + widthOffset > breakpoint) {
        hList.scrollTo({
          left: hList.scrollLeft - breakpoint,
          behavior: 'smooth',
        });
      } else {
        hList.scrollTo({
          left:
            hList.scrollLeft -
            Math.floor(
              (window.innerWidth + widthOffset) / (breakpoint / length),
            ) *
              (breakpoint / length),
          behavior: 'smooth',
        });
      }
    }
  };

export const onNext =
  ({ hList, breakpoint, length = 6, widthOffset = 0 }: args) =>
  () => {
    if (hList) {
      if (window.innerWidth + widthOffset > breakpoint) {
        hList.scrollTo({
          left: hList.scrollLeft + breakpoint,
          behavior: 'smooth',
        });
      } else {
        hList.scrollTo({
          left:
            hList.scrollLeft +
            Math.floor(
              (window.innerWidth + widthOffset) / (breakpoint / length),
            ) *
              (breakpoint / length),
          behavior: 'smooth',
        });
      }
    }
  };
