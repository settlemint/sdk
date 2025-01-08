## Functions

### proxyMiddleware()

> **proxyMiddleware**(`request`): `NextResponse` \| `undefined`

Defined in: [middlewares/proxy.ts:22](https://github.com/settlemint/sdk/blob/f376778a94312b023c8be79105ccd5c9be24df15/sdk/next/src/middlewares/proxy.ts#L22)

Middleware function to handle proxy requests

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | `NextRequest` | The incoming Next.js request |

#### Returns

`NextResponse` \| `undefined`

A modified NextResponse for proxy routes, or undefined for non-proxy routes

#### Example

```typescript
import { proxyMiddleware } from './middleware/proxy';

export default function middleware(request: NextRequest) {
  return proxyMiddleware(request);
}
```
