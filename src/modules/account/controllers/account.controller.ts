import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountService } from '../services/account.service';
import { accountRoutesV1 } from '../account.router';
import { ListAccountResponseDto, TokensInputDto } from '../dto';

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
}
