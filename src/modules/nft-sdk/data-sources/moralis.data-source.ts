import { Injectable } from '@nestjs/common';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { appConfig } from '@src/env';
import { NftDataSource } from '../interfaces';
import { IToken, ITokenBalance, IAccountBalance } from '../types';

@Injectable()
export class MoralisDataSource implements NftDataSource {
  private moralisInitialized = false;

  private async initMoralis() {
    if (this.moralisInitialized) return;
    await Moralis.start({ apiKey: appConfig.moralis.apiKey });
    this.moralisInitialized = true;
  }

  private async getTokenAddressesByWallet(accountAddress: string): Promise<string[]> {
    const response = await Moralis.EvmApi.nft.getWalletNFTCollections({ address: accountAddress });
    return response.toJSON().result.map((collection) => collection.token_address);
  }

  async getNftOwners(tokens: IToken[]): Promise<string[]> {
    await this.initMoralis();
    const response = await Moralis.EvmApi.nft.getMultipleNFTs({
      chain: EvmChain.ETHEREUM,
      tokens,
    });
    return response.toJSON().map((token) => token.owner_of);
  }

  async getAccountBalance(
    accountAddress: string,
    tokenAddresses: string[] = [],
  ): Promise<IAccountBalance> {
    await this.initMoralis();

    const contractAddresses =
      tokenAddresses && tokenAddresses.length
        ? tokenAddresses
        : await this.getTokenAddressesByWallet(accountAddress);

    const response = await Promise.all(
      contractAddresses.map((tokenAddress) =>
        Moralis.EvmApi.nft
          .getWalletNFTs({
            address: accountAddress,
            tokenAddresses: [tokenAddress],
            limit: 1,
          })
          .then((data) => data.toJSON()),
      ),
    );

    const tokenBalance = response.map(
      (tokenAddressResult, index): ITokenBalance => ({
        tokenAddress: contractAddresses[index],
        balance: tokenAddressResult.total,
      }),
    );

    return {
      totalBalance: tokenBalance.reduce((agg, ele) => (agg += ele.balance), 0),
      details: tokenBalance,
    };
  }
}
