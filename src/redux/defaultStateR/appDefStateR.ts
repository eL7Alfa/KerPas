export type appDefStateRT = {
  selectedAddress: { [key: string]: any };
  nearestMarket: { [key: string]: any };
  myAddressesOpen: boolean;
  marketDetailsModalOpen: boolean;
};

export const appDefStateR: appDefStateRT = {
  selectedAddress: {},
  nearestMarket: {},
  myAddressesOpen: false,
  marketDetailsModalOpen: false,
};
