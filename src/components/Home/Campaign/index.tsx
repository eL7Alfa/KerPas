import React, { Fragment, useState } from 'react';
import {
  Button,
  IconButton,
  MobileStepper,
  Skeleton,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import {
  autoPlay,
  SlideRendererCallback,
  SlideRenderProps,
  virtualize,
} from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { mod } from 'react-swipeable-views-core';
import { CampaignPropsType } from '../AppHeader/constants';
import useStyles from './styles';

const AutoPlaySwipeableViews = autoPlay(virtualize(SwipeableViews));

const Campaign = ({ data }: CampaignPropsType) => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = data.length;
  const [isSwiping, setIsSwiping] = useState(false);
  const [imageLoaded, setImageLoaded] = useState({ status: false, total: 0 });

  const handleNext = () => {
    if (!isSwiping) {
      setIsSwiping(true);
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (!isSwiping) {
      setIsSwiping(true);
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    }
  };

  const handleStepChange = (step: number) => {
    setIsSwiping(true);
    setActiveStep(step);
  };

  const handleTransitionEnd = () => {
    setIsSwiping(false);
  };

  const slideRenderer: SlideRendererCallback = ({
    index,
    key,
  }: SlideRenderProps) => {
    const iA = mod(index, data.length);
    if (iA >= 0 && iA < data.length) {
      return (
        <Button key={key} onClick={() => {}} className={classes.imgW}>
          <div>
            <Image
              onLoad={(e: any) => {
                if (e.target.complete === true) {
                  setImageLoaded(prevState => ({
                    ...prevState,
                    total: prevState.total + 1,
                  }));
                  if (data.length === imageLoaded.total) {
                    setImageLoaded(prevState => ({
                      ...prevState,
                      status: true,
                    }));
                  }
                }
              }}
              src={`https://kbi.sfo3.digitaloceanspaces.com/assets/img/campaign/${data[iA].cfoto_other}`}
              alt={data[iA].cfoto_other}
              placeholder={'blur'}
              blurDataURL={`https://kbi.sfo3.digitaloceanspaces.com/assets/img/campaign/${data[iA].cfoto_other}`}
              layout={'responsive'}
              width={'100%'}
              height={'100%'}
            />
          </div>
        </Button>
      );
    }
    return <Fragment />;
  };

  if (data.length === 0) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <div className={classes.wrapper}>
        {data.length > 1 ? (
          <AutoPlaySwipeableViews
            index={activeStep}
            onChangeIndex={handleStepChange}
            onTransitionEnd={handleTransitionEnd}
            className={classes.autoPlay}
            interval={6000}
            springConfig={{ duration: '1s', easeFunction: 'ease', delay: '0s' }}
            {...{ slideRenderer }}
            enableMouseEvents
          />
        ) : (
          <div className={classes.autoPlay}>
            <Button onClick={() => {}} className={classes.imgW}>
              <div>
                <Image
                  onLoad={(e: any) => {
                    if (e.target.complete === true) {
                      setImageLoaded(prevState => ({
                        ...prevState,
                        total: prevState.total + 1,
                      }));
                      if (data.length === imageLoaded.total) {
                        setImageLoaded(prevState => ({
                          ...prevState,
                          status: true,
                        }));
                      }
                    }
                  }}
                  src={`https://kbi.sfo3.digitaloceanspaces.com/assets/img/campaign/${data[0].cfoto_other}`}
                  alt={data[0].cfoto_other}
                  placeholder={'blur'}
                  blurDataURL={`https://kbi.sfo3.digitaloceanspaces.com/assets/img/campaign/${data[0].cfoto_other}`}
                  layout={'responsive'}
                  width={'100%'}
                  height={'100%'}
                />
              </div>
            </Button>
          </div>
        )}
        {data.length > 1 && (
          <IconButton
            tabIndex={1}
            onClick={handleBack}
            className={classes.backIconButton}>
            <NavigateBefore />
          </IconButton>
        )}
        <MobileStepper
          variant={'dots'}
          steps={maxSteps}
          position={'static'}
          activeStep={mod(activeStep, data.length)}
          className={classes.mobileStepper}
          nextButton={<Fragment />}
          backButton={<Fragment />}
        />
        {data.length > 1 && (
          <IconButton
            tabIndex={1}
            onClick={handleNext}
            className={classes.nextIconButton}>
            <NavigateNext />
          </IconButton>
        )}
        {!imageLoaded.status && (
          <Skeleton
            variant={'rectangular'}
            animation={'wave'}
            width={`calc(100% - (${theme.spacing(2)} * 2))`}
            sx={{
              borderRadius: 4,
              position: 'absolute',
              top: 0,
              backgroundColor: '#eeeeee',
              my: 1,
            }}>
            <div className={classes.imgW} />
          </Skeleton>
        )}
      </div>
    </Fragment>
  );
};

export default Campaign;
