export type appDefStateRT = {
  selectedAddress: { [key: string]: any };
  nearestMarket: { [key: string]: any };
  myAddressesOpen: boolean;
  marketDetailsModal: { open: boolean; [key: string]: any };
};

export const appDefStateR: appDefStateRT = {
  selectedAddress: {},
  nearestMarket: {},
  myAddressesOpen: false,
  marketDetailsModal: { open: false },
};
