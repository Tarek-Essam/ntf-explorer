import { Module } from '@nestjs/common';
import { AccountController } from './controllers';
import { NftModule } from '@modules/nft-sdk/nft.module';
import { AccountService } from './services/account.service';

@Module({
  imports: [NftModule],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
