import { accessTokenPrompt } from "@/commands/connect/accesstoken.prompt";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { writeEnvSpinner } from "@/commands/connect/write-env.spinner";
import { Command, Option } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro, spinner } from "@settlemint/sdk-utils/terminal";
import isInCi from "is-in-ci";

/**
 * Creates and returns the 'workspace' command for the SettleMint SDK.
 * This command creates a new workspace in the SettleMint platform.
 * It takes a name and optional description for the workspace.
 */
export function workspaceCreateCommand() {
  const cmd = new Command("workspace")
    .alias("w")
    .description(
      `Create a new workspace in the SettleMint platform.

Examples:
  # Create a workspace with company details
  $ bunx @settlemint/sdk-cli@latest platform create workspace my-workspace --name "SettleMint" --tax-id-type eu_vat --tax-id-value BE0661674810

  # Create a workspace with address details
  $ bunx @settlemint/sdk-cli@latest platform create workspace my-workspace --line1 "123 Main St" --city "Brussels" --postal-code "1000" --country BE

  # Create a workspace and save as default
  $ bunx @settlemint/sdk-cli@latest platform create workspace my-workspace -d`,
    )
    .argument("<name>", "The name of the workspace")
    .option("-a, --accept", "Accept the default values")
    .option("-d, --default", "Save as default workspace")
    .option("--prod", "Connect to production environment")
    .requiredOption("--company-name <companyName>", "Company name")
    .requiredOption("--address-line-1 <addressLine1>", "Address line 1")
    .option("--address-line-2 <addressLine2>", "Address line 2")
    .requiredOption("--city <city>", "City")
    .requiredOption("--postal-code <code>", "Postal code")
    .requiredOption("--country <country>", "Country")
    .option("--tax-id-value <value>", "Tax ID value")
    .addOption(
      new Option(
        "--tax-id-type <type>",
        "Tax ID type (e.g. 'eu_vat' for European VAT number like 'ATU12345678', 'us_ein' for US EIN like '12-3456789')",
      ).choices([
        "ad_nrt",
        "ar_cuit",
        "au_abn",
        "au_arn",
        "eu_vat",
        "bh_vat",
        "by_tin",
        "bo_tin",
        "br_cnpj",
        "br_cpf",
        "bg_uic",
        "ca_bn",
        "ca_gst_hst",
        "ca_pst_bc",
        "ca_pst_mb",
        "ca_pst_sk",
        "ca_qst",
        "cl_tin",
        "cn_tin",
        "co_nit",
        "cr_tin",
        "hr_oib",
        "do_rcn",
        "ec_ruc",
        "eg_tin",
        "sv_nit",
        "eu_oss_vat",
        "ge_vat",
        "de_stn",
        "hk_br",
        "hu_tin",
        "is_vat",
        "in_gst",
        "id_npwp",
        "il_vat",
        "jp_cn",
        "jp_rn",
        "jp_trn",
        "kz_bin",
        "ke_pin",
        "li_uid",
        "li_vat",
        "my_frp",
        "my_itn",
        "my_sst",
        "mx_rfc",
        "md_vat",
        "ma_vat",
        "nz_gst",
        "ng_tin",
        "no_vat",
        "no_voec",
        "om_vat",
        "pe_ruc",
        "ph_tin",
        "ro_tin",
        "ru_inn",
        "ru_kpp",
        "sa_vat",
        "rs_pib",
        "sg_gst",
        "sg_uen",
        "si_tin",
        "za_vat",
        "kr_brn",
        "es_cif",
        "ch_uid",
        "ch_vat",
        "tw_vat",
        "tz_vat",
        "th_vat",
        "tr_tin",
        "ua_vat",
        "ae_trn",
        "gb_vat",
        "us_ein",
        "uy_ruc",
        "uz_tin",
        "uz_vat",
        "ve_rif",
        "vn_tin",
      ]),
    )
    .option("--payment-method-id <paymentMethodId>", "Payment method ID")
    .option("--parent-id <parentId>", "Parent workspace ID")
    .action(
      async (
        name,
        {
          accept,
          default: isDefault,
          prod,
          taxIdValue,
          taxIdType,
          postalCode,
          paymentMethodId,
          parentId,
          country,
          companyName,
          city,
          addressLine2,
          addressLine1,
        },
      ) => {
        intro("Creating workspace in the SettleMint platform");

        const autoAccept = !!accept || isInCi;
        const env: Partial<DotEnv> = await loadEnv(false, !!prod);

        const accessToken = await accessTokenPrompt(env, autoAccept);
        const instance = await instancePrompt(env, autoAccept);
        const settlemint = createSettleMintClient({
          accessToken,
          instance,
        });

        const workspace = await spinner({
          startMessage: "Creating workspace",
          task: async () => {
            return settlemint.workspace.create({
              name,
              taxIdValue,
              taxIdType,
              postalCode,
              paymentMethodId,
              parentId,
              country,
              companyName,
              city,
              addressLine2,
              addressLine1,
            });
          },
          stopMessage: "Workspace created",
        });

        outro(`Workspace ${workspace.name} created successfully`);

        if (isDefault) {
          await writeEnvSpinner(!!prod, {
            SETTLEMINT_ACCESS_TOKEN: accessToken,
            SETTLEMINT_INSTANCE: instance,
            SETTLEMINT_WORKSPACE: workspace.id,
          });
        }
      },
    );

  return cmd;
}
