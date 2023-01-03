import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsHexadecimal, IsNumberString, ValidateNested, Length } from 'class-validator';

export class Token {
  @ApiProperty({
    example: '7711',
    description: 'nft token id',
    required: true,
  })
  @IsNumberString()
  tokenId: string;

  @ApiProperty({
    example: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    description: 'contract address',
    required: true,
  })
  @Length(42, 42)
  @IsHexadecimal()
  tokenAddress: string;
}

export class TokensInputDto {
  @ApiProperty({
    description: 'contract address',
    required: true,
  })
  @Type(() => Token)
  @ValidateNested({ each: true })
  @IsArray()
  tokens: Token[];
}

export class ListAccountResponseDto {
  @ApiProperty({
    example: [
      '0x7811c6a535ddff8f86bfdeade882e744bc9fe380',
      '0x2c74fd427e36a5c22f164093147eace027ec5706',
    ],
    description: 'list of accounts addresses',
    required: true,
  })
  addresses: string[];
}
