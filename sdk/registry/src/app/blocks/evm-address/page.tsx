import { EvmAddress } from "@/components/blocks/evm-address/evm-address";

export default function EvmAddressPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">EVM Address</h1>
      <EvmAddress address="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045">
        <p>content</p>
      </EvmAddress>
    </>
  );
}
