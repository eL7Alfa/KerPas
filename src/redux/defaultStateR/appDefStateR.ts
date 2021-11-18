import { ProductTypes } from '../../components/constants';

export type NearestMarketTypes = {
  id?: number;
  ckode_mitra: string;
  cnama_mitra: string;
  calamat_toko: string;
  distance: { text: string; value: number };
  ckota: string;
  cfoto: string;
  cdeskripsi: string;
};

export interface addToCartModal extends ProductTypes {
  open: boolean;
}

export type appDefStateRT = {
  selectedAddress: { [key: string]: any };
  nearestMarket: NearestMarketTypes;
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
  addToCartModal: addToCartModal;
};

export const appDefStateR: appDefStateRT = {
  selectedAddress: {},
  nearestMarket: {
    cdeskripsi: '',
    calamat_toko: '',
    distance: { text: '', value: 0 },
    ckota: '',
    cfoto: '',
    ckode_mitra: '',
    cnama_mitra: '',
    id: undefined,
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
  addToCartModal: {
    open: false,
    discount: 0,
    classCode: '',
    class: '',
    market: {},
    name: '',
    price: 0,
    fixedPrice: 0,
    unit: '',
    weight: 0,
    category: '',
    imageUri: '',
    imagesUri: [],
    description: '',
    sku: '',
    brand: '',
    slug: '',
  },
};
