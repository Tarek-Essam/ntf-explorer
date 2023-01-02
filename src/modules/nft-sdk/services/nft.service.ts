import { Injectable } from '@nestjs/common';
import { NftDataSource } from '../interfaces';
import { MoralisDataSource } from '../data-sources';
import { AvailableDataSources } from '../types';

@Injectable()
export class NftService {
  private ntfDataSourceMapping = new Map<string, NftDataSource>();

  constructor(private readonly moralisDataSource: MoralisDataSource) {
    this.ntfDataSourceMapping.set(AvailableDataSources.Moralis, this.moralisDataSource);
  }

  get(dataSource: AvailableDataSources = AvailableDataSources.Moralis): NftDataSource {
    return this.ntfDataSourceMapping.get(dataSource);
  }
}
