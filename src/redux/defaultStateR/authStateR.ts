export type userDataRT = {
  id: number;
  ckode_user: string;
  cfb_id: string | null;
  cnama: string;
  cemail: string;
  ctelp: string;
  fbs_token: string;
  cprofile_picture: string;
  mstatus_login: number;
  cactive: string;
  nsaldo_voucher: string;
  dcreate: string;
  dmodify: string;
  token: string;
};

export type authStateRT = {
  modalOpen: boolean;
  userData: userDataRT;
};

const authStateR: authStateRT = {
  modalOpen: false,
  userData: {
    id: 0,
    ckode_user: '',
    cfb_id: null,
    cnama: '',
    cemail: '',
    ctelp: '',
    fbs_token: '',
    cprofile_picture: '',
    mstatus_login: 0,
    cactive: '0',
    nsaldo_voucher: '0',
    dcreate: '',
    dmodify: '',
    token: '',
  },
};

export default authStateR;
