import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountService } from '../services/account.service';
import { accountRoutesV1 } from '../account.router';
import {
  ListAccountResponseDto,
  TokensInputDto,
  AccountAddressDto,
  AccountBalanceDto,
  TokenAddressesDto,
} from '../dto';
import { IAccountBalance } from '@src/modules/nft-sdk/types';

@ApiTags('account')
@Controller({
  version: accountRoutesV1.version,
  path: accountRoutesV1.root,
})
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post(accountRoutesV1.listAccounts)
  @HttpCode(200)
  @ApiOperation({
    summary: 'get list of token owners',
    description: 'get list of account owners for provided token ids',
    operationId: 'V1GetAccountsList',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ListAccountResponseDto,
  })
  async listAccount(@Body() body: TokensInputDto): Promise<ListAccountResponseDto> {
    const addresses = await this.accountService.listAccountsByTokens(body.tokens);
    return { addresses };
  }

  @Get(accountRoutesV1.getAccountBalance)
  @HttpCode(200)
  @ApiOperation({
    summary: 'get account balance',
    description: 'get account balance for all token addresses',
    operationId: 'V1GetAccountBalance',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AccountBalanceDto,
  })
  async getAccountBalance(
    @Param() param: AccountAddressDto,
    @Query() query: TokenAddressesDto,
  ): Promise<IAccountBalance> {
    return this.accountService.getAccountBalance(param.accountAddress, query.tokenAddresses);
  }
}
