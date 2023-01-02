import { Injectable } from '@nestjs/common';
import { NftDataSource } from '../interfaces';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { appConfig } from '@src/env';
import { IToken } from '../types';

@Injectable()
export class MoralisDataSource implements NftDataSource {
  async getNftOwners(tokens: IToken[]): Promise<string[]> {
    await Moralis.start({ apiKey: appConfig.moralis.apiKey });
    const response = await Moralis.EvmApi.nft.getMultipleNFTs({
      chain: EvmChain.ETHEREUM,
      tokens,
    });
    return response.toJSON().map((token) => token.owner_of);
  }
}
