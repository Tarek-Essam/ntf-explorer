import supertest from 'supertest';
import { serverPromise } from '@src/main';
import { HttpStatus } from '@nestjs/common';
import { Server } from 'http';

describe('list accounts GET /v1/account', () => {
  let app: Server;

  beforeAll(async () => {
    app = await serverPromise;
  });

  afterAll(() => {
    app.close();
  });

  describe('should throw validation error if the data is not valid', () => {
    it.each([
      {},
      { tokens: [{}] },
      { tokens: [{ tokenId: '100' }] },
      { tokens: [{ tokenAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13f' }] },
      { tokens: [{ tokenId: '', tokenAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13f' }] },
      { tokens: [{ tokenId: '100', tokenAddress: '' }] },
    ])('should return 422 Bad Request on invalid request parameters: %p', async (tokens) => {
      await supertest(app).post('/v1/account').send(tokens).expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });
  });

  // describe('should return list of accounts when providing list of tokens', () => {
  //   it('should return list of addresses', async () => {
  //     const tokens = {
  //       tokens: [{ tokenId: '100', tokenAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13f' }],
  //     };
  //     const accounts = ['	0x2c74fd427e36a5c22f164093147eace027ec5706'];
  //     // mockGetMultipleNfts(tokens, accounts);
  //     const { body } = await supertest(app).post('/v1/account').send(tokens).expect(HttpStatus.OK);
  //     console.log(body);
  //   });
  // });
});
