[**@settlemint/sdk-js**](../README.md)

***

[@settlemint/sdk-js](../globals.md) / createSettleMintClient

# Function: createSettleMintClient()

> **createSettleMintClient**(`options`): [`SettlemintClient`](../interfaces/SettlemintClient.md)

Defined in: [sdk/js/src/settlemint.ts:179](https://github.com/settlemint/sdk/blob/e111fec8517329683d6b1561f972ee1316689801/sdk/js/src/settlemint.ts#L179)

Creates a SettleMint client with the provided options.

## Parameters

### options

The options for creating the SettleMint client.

#### accessToken

`string` = `AccessTokenSchema`

#### instance

`string` = `UrlSchema`

## Returns

[`SettlemintClient`](../interfaces/SettlemintClient.md)

An object containing various methods to interact with SettleMint resources.

## Throws

Will throw an error if the options are invalid or if called in a browser environment.

## Example

```ts
const client = createSettleMintClient({
  accessToken: 'btp_aat_xxxxxxxxxxxxxxxxxxxxxxxx',
  instance: 'https://console.settlemint.com'
});
```
