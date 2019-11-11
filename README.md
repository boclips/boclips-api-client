# Boclips API client

A JS client to access the API for our frontend applications.

## Development

### Overview

This client uses [pact](https://pact.io) to create contracts that are then verified against our staging API.

> Pact is a code-first tool for testing HTTP and message integrations using contract tests. Contract tests assert that inter-application messages conform to a shared understanding that is documented in a contract. Without contract testing, the only way to ensure that applications will work correctly together is by using expensive and brittle integration tests.

There are two parts to testing our client, tests that test our client can handle http responses (contracts) in a meaningful way and secondly, tests that verify that the contracts we have defined match that of the responses from our backend services.

We define expected interactions which is essentially setting up a mock http layer to test the client against. When the client tests pass, pact writes to a JSON file in `./pacts` which is then used as a contract to test against our staging API gateway.

- `npm run test:unit` unit tests for services
- `npm run test:client` tests that our mocks (interactions) set up are handled correctly by this client. If successful it will create the PACT contracts file under `./pacts`
- `npm run test:verify` replay all interactions specified under `./pacts` against the staging API gateway and verifies that the responses match the expectations

### FakeBoclipsClient

A fake implementation of the `BoclipsClient` is included to help testing in the consumer applications. 

Eg. in your integration tests if you include the fake implementation instead of the real, you do not need to mock http requests and can set up some sample data to be used by the client.

```
const fakeClient = new FakeBoclipsClient();

// sample data set up
fakeClient.collectionsClient.addToFake(testCollection);
fakeClient.collectionsClient.addToFake(otherTestCollection);

// ... your tests here ...

// reset the state of the client in the end
fakeClient.clear();
```

### Sub-clients

The `BoclipsClient` contains sub-clients to help access the various resources from our API.

#### Usage in costumers

```
let axios: AxiosInstance; // the set up axios instance to be used in the API requests (eg. Authentication should be setup by costumer)
let prefix: string; // environment specific URL prefix to be used, eg. https://api.staging-boclips.com

const client = await ApiBoclipsClient.initialize(axios, prefix); 

// Query an existing collection by id
const existingCollection = await client.collectionsClient.get('sample-collection-id');
```

#### Adding new sub-clients

1. Include in `BoclipsClient` as a new field
2. Make a proper and a fake implementation and include them in `ApiBoclipsClient` and `FakeBoclipsClient` respectively
3. Follow the sample folder structure:
```
src
|-- sub-clients
    |-- newSubClient
        |-- client
            |-- NewSubClient.ts -> interface for your new sub client
            |-- ApiNewSubClient.ts -> real implementation
            |-- FakeNewSubClient.ts -> fake implementation for helping testing in consumer apps
            |-- NewSubClient.test.pact.ts -> tests for the new sub client using pact interactions (npm run test:client will run this)
        |-- model -> any data models needed for handling API response, consumer requests, etc.
        |-- pact
            |-- NewSubClientInteractions.ts -> specify the API interactions / rules that you want to cover by the new sub client
```

### Linking Packages

Sometimes it can be annoying to wait for a release before testing changes to this library. To test locally with another app that's using this library simply from the `boclips-api-client` directory:

```none
npm run link
cd ../your-app
npm link boclips-api-client
```

This will set up a symlink between the local client library build and the `node_modules/` in your-app

(This uses npm link under the hood, more info [here](https://docs.npmjs.com/cli/link.html))
