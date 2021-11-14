import React, { Fragment } from 'react';
import { MarketPropsTypes } from '../../Items/Market';
import { SupplierPropsTypes } from '../../Items/Supplier';

export type HeaderPropsTypes = {
  market: MarketPropsTypes;
  supplier: SupplierPropsTypes;
};

const Header = ({ market, supplier }: HeaderPropsTypes) => {
  return (
    <Fragment>
      <div>{supplier.name}</div>
    </Fragment>
  );
};

export default Header;
