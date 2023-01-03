import { Injectable } from '@nestjs/common';
import { NftService } from '@modules/nft-sdk/services';
import { Token } from '../dto';
import { IAccountBalance } from '@modules/nft-sdk/types';

@Injectable()
export class AccountService {
  constructor(private readonly nftService: NftService) {}

  listAccountsByTokens(tokens: Token[]): Promise<string[]> {
    return this.nftService.get().getNftOwners(tokens);
  }

  getAccountBalance(accountAddress: string, tokenAddresses?: string[]): Promise<IAccountBalance> {
    return this.nftService.get().getAccountBalance(accountAddress, tokenAddresses);
  }
}
