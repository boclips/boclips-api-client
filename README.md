# Boclips API client

A JS client to access the API for our frontend applications.

## Development

### Overview

This client uses [pact](https://pact.io) to create contracts that are then verified against our staging api.

> Pact is a code-first tool for testing HTTP and message integrations using contract tests. Contract tests assert that > inter-application messages conform to a shared understanding that is documented in a contract. Without contract testing, > the only way to ensure that applications will work correctly together is by using expensive and brittle integration tests.

There are two parts to testing our client, tests that test our client can handle http responses (contracts) in a meaningful way and secondly, tests that verify that the contracts we have defined match that of the responses from our backend services.

We define expected interactions which is essentially setting up a mock http layer to test the client against. When the client tests pass, pact writes to a JSON file in `./pacts` which is then used as a contract to test against our staging gateway.

- `npm run test` tests that our mocks (interactions) set up are handled correctly by this client
- `npm run verify` verifies that our interactions we defined match what is returned from our staging gateway

### Linking Packages

Sometimes it can be annoying to wait for a release before testing changes to this library. To test locally with another app that's using this library simply from the `boclips-api-client` directory:

```none
npm run link
cd ../your-app
npm link boclips-api-client
```

This will set up a symlink between the local client library build and the `node_modules/` in your-app

(This uses npm link under the hood, more info [here](https://docs.npmjs.com/cli/link.html))
