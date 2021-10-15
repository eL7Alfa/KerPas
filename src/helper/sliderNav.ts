type args = {
  hList?: HTMLDivElement;
  breakpoint: number;
  length?: number;
};

export const onPrev =
  ({ hList, breakpoint, length = 6 }: args) =>
  () => {
    if (hList) {
      if (window.innerWidth > breakpoint) {
        hList.scrollTo({
          left: hList.scrollLeft - breakpoint,
          behavior: 'smooth',
        });
      } else {
        hList.scrollTo({
          left:
            hList.scrollLeft -
            Math.floor(window.innerWidth / (breakpoint / length)) *
              (breakpoint / length),
          behavior: 'smooth',
        });
      }
    }
  };

export const onNext =
  ({ hList, breakpoint, length = 6 }: args) =>
  () => {
    if (hList) {
      if (window.innerWidth > breakpoint) {
        hList.scrollTo({
          left: hList.scrollLeft + breakpoint,
          behavior: 'smooth',
        });
      } else {
        console.log(
          breakpoint / length,
          Math.floor(window.innerWidth / (breakpoint / length)),
        );
        hList.scrollTo({
          left:
            hList.scrollLeft +
            Math.floor(window.innerWidth / (breakpoint / length)) *
              (breakpoint / length),
          behavior: 'smooth',
        });
      }
    }
  };
