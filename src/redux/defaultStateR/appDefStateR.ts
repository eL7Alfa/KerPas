export type appDefStateRT = {
  selectedAddress: { [key: string]: any };
  nearestMarket: { [key: string]: any };
  myAddressesOpen: boolean;
};

export const appDefStateR: appDefStateRT = {
  selectedAddress: {},
  nearestMarket: {},
  myAddressesOpen: false,
};
