import { IToken } from '../types';

export interface NftDataSource {
  getNftOwners(params: IToken[]): Promise<string[]>;
}
