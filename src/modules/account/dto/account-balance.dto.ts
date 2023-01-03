import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsHexadecimal, Length, IsOptional } from 'class-validator';

export class AccountAddressDto {
  @ApiProperty({
    example: '0x619866736a3a101f65cff3a8c3d2602fc54fd749',
    description: 'account address',
    required: true,
  })
  @Length(42, 42)
  @IsHexadecimal()
  accountAddress: string;
}

export class TokenAddressesDto {
  @ApiPropertyOptional({
    example: [
      '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
      '0x1A92f7381B9F03921564a437210bB9396471050C',
    ],
    description: 'account address',
    required: true,
  })
  @Transform(({ value }) => {
    return Array.isArray(value) ? value : value.split(',');
  })
  @IsOptional()
  @IsArray()
  tokenAddresses?: string[];
}

export class TokenBalance {
  @ApiProperty({
    example: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    description: 'token address',
    required: true,
  })
  tokenAddress: string;

  @ApiProperty({
    example: 10,
    description:
      'balance of user in the token (total number of nfts owned by user in this contract)',
    required: true,
  })
  balance: number;
}

export class AccountBalanceDto {
  @ApiProperty({
    example: 170,
    description: 'total balance of user',
    required: true,
  })
  totalBalance: number;

  @ApiProperty({
    description: 'total balance of user',
    required: true,
  })
  @Type(() => TokenBalance)
  details: TokenBalance[];
}
