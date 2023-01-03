import { Injectable } from '@nestjs/common';
import { NftService } from '@modules/nft-sdk/services';
import { Token } from '../dto';

@Injectable()
export class AccountService {
  constructor(private readonly nftService: NftService) {}

  listAccountsByTokens(tokens: Token[]): Promise<string[]> {
    return this.nftService.get().getNftOwners(tokens);
  }
}
