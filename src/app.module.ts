import { Module } from '@nestjs/common';
import { AccountModule } from '@modules/account/account.module';

@Module({
  imports: [AccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
