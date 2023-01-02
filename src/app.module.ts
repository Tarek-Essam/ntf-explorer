import { Module } from '@nestjs/common';
import { AccountModule } from '@modules/account/account.module';
import { NftModule } from '@modules/nft-sdk/nft.module';

@Module({
  imports: [AccountModule, NftModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
