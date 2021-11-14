export type MarketsTypes = {
  id: number;
  ckode_mitra: string;
  cnama_mitra: string;
  calamat_toko: string;
  distance: { text: string; value: number };
  ckota: string;
  cfoto: string;
  cdeskripsi: string;
};

export type appDefStateRT = {
  selectedAddress: { [key: string]: any };
  nearestMarket: MarketsTypes;
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
  nearestMarket: {
    cdeskripsi: '',
    calamat_toko: '',
    distance: { text: '', value: 0 },
    ckota: '',
    cfoto: '',
    id: 0,
    ckode_mitra: '',
    cnama_mitra: '',
  },
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
