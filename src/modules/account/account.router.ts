const accountRoot = 'account';

export const accountRoutesV1 = {
  version: '1',
  root: accountRoot,
  listAccounts: '/',
  getAccountBalance: '/:accountAddress/balance',
};
