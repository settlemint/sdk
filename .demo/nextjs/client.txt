import { TokenList } from "@/components/token-list";
import {
  theGraphClientErc20demo,
  theGraphGraphqlErc20demo,
} from "@/lib/settlemint/the-graph";

const ListTokens = theGraphGraphqlErc20demo(`
  query ListTokens {
    erc20Contracts {
      id
      name
      symbol
      decimals
    }
  }
`);

export default async function Home() {
  const tokens = await theGraphClientErc20demo.request(ListTokens);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl">
        <h1 className="text-2xl font-bold">Tokens, rendered on the server</h1>
        <div className="w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="p-4 font-medium w-1/4">Name</th>
                <th className="p-4 font-medium w-1/4">Symbol</th>
                <th className="p-4 font-medium w-1/4 text-right">Decimals</th>
                <th className="p-4 font-medium w-1/4">Address</th>
              </tr>
            </thead>
            <tbody>
              {tokens.erc20Contracts.map((token) => (
                <tr key={token.id} className="hover:bg-gray-50">
                  <td className="p-4">{token.name}</td>
                  <td className="p-4">{token.symbol}</td>
                  <td className="p-4 text-right">{token.decimals}</td>
                  <td className="p-4 font-mono text-sm text-gray-500">
                    {token.id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <TokenList />
        </div>
      </main>
    </div>
  );
}
