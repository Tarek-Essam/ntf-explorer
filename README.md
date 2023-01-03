# NFT Explorer
## Description

This service use [Moralis](https://moralis.io/) to avail APIs to retrieve information about NFTs. 

## Assumptions
1. For the first requirement
> Return a list of Ethereum accounts which owns both tokens.

    Assuming the API will receive the token id & token address.

2. For the second requirement
> Balance of an owner who owns both tokens.

    Assuming the API will the receive owner wallet address and return the NFT balance for this owner.


## Installation

```bash
$ yarn install
```

## Running the app

```bash
# Register in moralis and get your API key

# Add Env file with the keys in the .env.example file

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## API Documentation
> After running the server go to **/docs** to see the swagger documentation.

## Test

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```


