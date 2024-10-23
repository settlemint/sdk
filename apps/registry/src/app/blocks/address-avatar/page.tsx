import { AddressAvatar } from "@/components/blocks/address-avatar/address-avatar";
import { CollapsedBreadcrumbSetter } from "@/components/blocks/collapsed-breadcrumb/collapsed-breadcrumb-setter";

export default function AddressAvatarPage() {
  return (
    <>
      <CollapsedBreadcrumbSetter
        items={[
          { label: "Home", href: "/" },
          { label: "Blocks", href: "/blocks" },
          { label: "Address Avatar", href: "/blocks/address-avatar" },
        ]}
      />
      <h1 className="text-2xl font-bold">Address Avatar</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h2 className="text-xl mb-4">Big with address</h2>
          <AddressAvatar address="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" variant="big" />
        </div>
        <div>
          <h2 className="text-xl mb-4">Small with email and indicator</h2>
          <AddressAvatar email="roderik@settlemint.com" indicator variant="small" />
        </div>
        <div>
          <h2 className="text-xl mb-4 ">Big without address or email and with indicator</h2>
          <AddressAvatar variant="big" indicator />
        </div>
        <div>
          <h2 className="text-xl mb-4 ">Tiny without address or email</h2>
          <AddressAvatar variant="tiny" />
        </div>
      </div>
    </>
  );
}
