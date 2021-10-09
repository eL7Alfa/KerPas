type args = {
  hList?: HTMLDivElement;
  breakpoint: number;
};

export const onPrev =
  ({ hList, breakpoint }: args) =>
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
            Math.floor(window.innerWidth / (breakpoint / 6)) * (breakpoint / 6),
          behavior: 'smooth',
        });
      }
    }
  };

export const onNext =
  ({ hList, breakpoint }: args) =>
  () => {
    if (hList) {
      if (window.innerWidth > breakpoint) {
        hList.scrollTo({
          left: hList.scrollLeft + breakpoint,
          behavior: 'smooth',
        });
      } else {
        console.log(
          breakpoint / 6,
          Math.floor(window.innerWidth / (breakpoint / 6)),
        );
        hList.scrollTo({
          left:
            hList.scrollLeft +
            Math.floor(window.innerWidth / (breakpoint / 6)) * (breakpoint / 6),
          behavior: 'smooth',
        });
      }
    }
  };
