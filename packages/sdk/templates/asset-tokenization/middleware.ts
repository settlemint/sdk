import { auth } from "@/auth";
import { withSettleMintMiddleware } from "@settlemint/sdk-next";

export default withSettleMintMiddleware({
  auth,
});
