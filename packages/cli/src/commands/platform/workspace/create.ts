import { Command, Option } from "@commander-js/extra-typings";

/**
 * Creates and returns the 'workspace' command for the SettleMint SDK.
 * This command creates a new workspace in the SettleMint platform.
 * It takes a name and optional description for the workspace.
 *
 * @returns {Command} The configured 'workspace' command
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
    .option("--line1 <line1>", "Address line 1")
    .option("--line2 <line2>", "Address line 2")
    .option("--city <city>", "City")
    .option("--postal-code <code>", "Postal code")
    .option("--country <country>", "Country")
    .option("--name <name>", "Company name")
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
    );

  return cmd;
}
