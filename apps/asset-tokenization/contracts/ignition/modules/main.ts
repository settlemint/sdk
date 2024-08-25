import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MainModule = buildModule("MainModule", (m) => {
  const erc1155 = m.contract("Asset");

  return { erc1155 };
});

export default MainModule;
