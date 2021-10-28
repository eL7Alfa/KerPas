import { IconButton, Typography, useTheme } from '@mui/material';
import useStyles from './styles';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import Category, { CategoryProps } from './Category';
import React, { createRef, Fragment, useEffect, useState } from 'react';
import { onNext, onPrev } from '../../../helper/sliderNav';
import usePrevious from '../../../helper/usePrevious';

type CategoriesProps = {
  data: CategoryProps[];
};

const Categories = ({ data }: CategoriesProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const listW = createRef<HTMLDivElement>();
  const prevData = usePrevious(data);
  const [listLoaded, setListLoaded] = useState<{
    state: boolean;
    height: number;
    hList?: HTMLDivElement;
  }>({
    state: false,
    height: 0,
  });

  useEffect(() => {
    if (prevData !== data && listW.current && !listLoaded.state) {
      setListLoaded({
        state: true,
        height: listW.current.getBoundingClientRect().height,
        hList: listW.current,
      });
    }
  }, [data, listW, listW.current]);

  if (data.length === 0) {
    return <Fragment />;
  }

  return (
    <div className={classes.root}>
      <Typography variant={'h6'} className={classes.title} px={2}>
        Kebutuhan Pangan Anda
      </Typography>
      <div className={classes.hListW}>
        <div className={classes.itemsW} ref={listW}>
          {data.map((d, key) => (
            <Category
              key={key}
              imageUri={d.imageUri}
              name={d.name}
              url={d.url}
            />
          ))}
        </div>
        {listLoaded.state && (
          <IconButton
            tabIndex={1}
            onClick={onPrev({
              hList: listLoaded.hList,
              breakpoint: theme.breakpoints.values.lg,
              length: 5,
            })}
            className={classes.prevIconBtn}
            style={{ marginBottom: 16 }}>
            <NavigateBefore />
          </IconButton>
        )}
        {listLoaded.state && (
          <IconButton
            tabIndex={1}
            onClick={onNext({
              hList: listLoaded.hList,
              breakpoint: theme.breakpoints.values.lg,
              length: 5,
            })}
            className={classes.nextIconBtn}
            style={{ marginBottom: 16 }}>
            <NavigateNext />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default Categories;
