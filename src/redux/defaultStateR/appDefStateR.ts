import { ProductTypes } from '../../components/constants';
import { v4 as uuid } from 'uuid';

export type NearestMarketTypes = {
  id?: number;
  ckode_mitra: string;
  cnama_mitra: string;
  calamat_toko: string;
  distance: { text: string; value: number };
  ckota: string;
  cfoto: string;
  cdeskripsi: string;
  cloc: number;
};

export interface addToCartModal extends ProductTypes {
  open: boolean;
  callback?: 'default' | 'openCart';
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
  cartUpdateId: string;
  paymentModal: { open: boolean; transactionCode: string };
  dialog: {
    open: boolean;
    title: string;
    body: string;
    disagreeBtnText?: string;
    agreeBtnText: string;
  };
  invoice: {
    open: boolean;
    transactionCode: string;
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
    ckode_mitra: '',
    cnama_mitra: '',
    cloc: 0,
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
    callback: 'default',
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
  cartUpdateId: uuid(),
  paymentModal: {
    open: false,
    transactionCode: '',
  },
  dialog: {
    open: false,
    disagreeBtnText: '',
    agreeBtnText: '',
    body: '',
    title: '',
  },
  invoice: {
    open: false,
    transactionCode: '',
  },
};
