import React from 'react';
import useStyles from './styles';
import { Button, Typography } from '@mui/material';
import {
  setMyAddressesOpenR,
  setSelectedAddressR,
} from '../../../../redux/actions/appRActions';
import { useDispatch } from 'react-redux';
import { CheckCircle } from '@mui/icons-material';
import { appDefStateRT } from '../../../../redux/defaultStateR/appDefStateR';

export type MyAddressTypes = {
  data: appDefStateRT['selectedAddress'];
  selectedAddress: any;
};

const MyAddress = ({ data, selectedAddress }: MyAddressTypes) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSelectAddressClicked = () => {
    localStorage.setItem('selectedAddress', JSON.stringify(data));
    dispatch(setSelectedAddressR(data));
    dispatch(setMyAddressesOpenR(false));
  };

  return (
    <div
      className={`${classes.root} ${
        selectedAddress.id === data.id ? 'selected' : ''
      }`}>
      <div className={classes.sectionA}>
        <div className={classes.leftPart}>
          <Typography variant={'body2'} className={classes.addressType}>
            {data.cnama_alamat}
          </Typography>
          <Typography variant={'body2'} className={classes.address}>
            {data.calamat}
          </Typography>
          <Typography variant={'body2'} className={classes.addressByGoogle}>
            {data.maddress}
          </Typography>
        </div>
        <div className={classes.rightPart}>
          {selectedAddress.id !== data.id ? (
            <Button
              variant={'contained'}
              className={classes.selectBtn}
              onClick={onSelectAddressClicked}>
              PILIH
            </Button>
          ) : (
            <CheckCircle className={classes.selectedCheckbox} />
          )}
        </div>
      </div>
      <div className={classes.sectionB}>
        <Button className={classes.editBtn}>UBAH</Button>
      </div>
    </div>
  );
};

export default MyAddress;
