## Functions

### withSettleMint()

> **withSettleMint**\<`C`\>(`nextConfig`, `options`): `Promise`\<`C`\>

Defined in: [config/with-settlemint.ts:18](https://github.com/settlemint/sdk/blob/f376778a94312b023c8be79105ccd5c9be24df15/sdk/next/src/config/with-settlemint.ts#L18)

Modifies the passed in Next.js configuration with SettleMint-specific settings

#### Type Parameters

| Type Parameter |
| ------ |
| `C` *extends* `NextConfig` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `nextConfig` | `C` | The original Next.js configuration |
| `options` | `WithSettleMintOptions` | Options for customizing the SettleMint configuration |

#### Returns

`Promise`\<`C`\>

A Promise that resolves to the modified Next.js configuration

#### Throws

If the SettleMint configuration cannot be read or processed
