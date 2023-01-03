import { Injectable } from '@nestjs/common';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { appConfig } from '@src/env';
import { NftDataSource } from '../interfaces';
import { IToken } from '../types';

@Injectable()
export class MoralisDataSource implements NftDataSource {
  private moralisInitialized = false;

  private async initMoralis() {
    if (this.moralisInitialized) return;
    await Moralis.start({ apiKey: appConfig.moralis.apiKey });
    this.moralisInitialized = true;
  }

  async getNftOwners(tokens: IToken[]): Promise<string[]> {
    await this.initMoralis();
    const response = await Moralis.EvmApi.nft.getMultipleNFTs({
      chain: EvmChain.ETHEREUM,
      tokens,
    });
    return response.toJSON().map((token) => token.owner_of);
  }
}
