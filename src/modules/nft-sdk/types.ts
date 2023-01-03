export interface IToken {
  tokenId: string;
  tokenAddress: string;
}

export enum AvailableDataSources {
  Moralis = 'moralis',
}

export interface ITokenBalance {
  tokenAddress: string;
  balance: number;
}

export interface IAccountBalance {
  totalBalance: number;
  details: ITokenBalance[];
}
