export type appDefStateRT = {
  selectedAddress: { [key: string]: any };
  nearestMarket: { [key: string]: any };
  myAddressesOpen: boolean;
  marketDetailsModal: {
    open: boolean;
    marketImg: string;
    marketName: string;
    address: string;
    distance: { text: string; value: number };
    location: string;
    description: string;
  };
};

export const appDefStateR: appDefStateRT = {
  selectedAddress: {},
  nearestMarket: {},
  myAddressesOpen: false,
  marketDetailsModal: {
    open: false,
    address: '',
    distance: { text: '', value: 0 },
    location: '',
    marketImg: '',
    marketName: '',
    description: '',
  },
};
