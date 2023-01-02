import { Module } from '@nestjs/common';
import { MoralisDataSource } from './data-sources';
import { NftService } from './services';

@Module({
  imports: [],
  providers: [MoralisDataSource, NftService],
  exports: [NftService],
})
export class NftModule {}
