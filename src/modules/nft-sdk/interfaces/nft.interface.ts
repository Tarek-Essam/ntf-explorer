import { IToken, IAccountBalance } from '../types';

export interface NftDataSource {
  getNftOwners(tokens: IToken[]): Promise<string[]>;
  getAccountBalance(accountAddress: string, tokenAddresses?: string[]): Promise<IAccountBalance>;
}
