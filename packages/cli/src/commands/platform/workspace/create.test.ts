import { describe, expect, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import { workspaceCreateCommand } from "./create.js";

describe("workspaceCreateCommand", () => {
  test("executes command with valid arguments", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      workspaceCreateCommand().action((args, options) => {
        commandArgs = args;
        commandOptions = options;
      }),
    );
    program.parse(["node", "test", "workspace", "test-workspace", "--accept"]);

    // Validate command was executed with correct arguments
    expect(commandArgs).toBe("test-workspace");
    expect(commandOptions).toEqual({
      accept: true,
    });
  });

  test("executes command with company details", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      workspaceCreateCommand().action((args, options) => {
        commandArgs = args;
        commandOptions = options;
      }),
    );
    program.parse([
      "node",
      "test",
      "workspace",
      "test-workspace",
      "--name",
      "Test Company",
      "--tax-id-type",
      "eu_vat",
      "--tax-id-value",
      "BE0123456789",
    ]);

    expect(commandArgs).toBe("test-workspace");
    expect(commandOptions).toEqual({
      name: "Test Company",
      taxIdType: "eu_vat",
      taxIdValue: "BE0123456789",
    });
  });

  test("executes command with address details", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      workspaceCreateCommand().action((args, options) => {
        commandArgs = args;
        commandOptions = options;
      }),
    );
    program.parse([
      "node",
      "test",
      "workspace",
      "test-workspace",
      "--line1",
      "123 Test St",
      "--city",
      "Test City",
      "--postal-code",
      "12345",
      "--country",
      "BE",
    ]);

    expect(commandArgs).toBe("test-workspace");
    expect(commandOptions).toEqual({
      line1: "123 Test St",
      city: "Test City",
      postalCode: "12345",
      country: "BE",
    });
  });

  test("throws error with invalid tax id type", () => {
    const program = new Command();
    program.addCommand(workspaceCreateCommand().exitOverride());

    expect(() => {
      program.parse([
        "node",
        "test",
        "workspace",
        "test-workspace",
        "--name",
        "Test Company",
        "--tax-id-type",
        "invalid_type", // Invalid tax ID type
        "--tax-id-value",
        "BE0123456789",
      ]);
    }).toThrow(
      "error: option '--tax-id-type <type>' argument 'invalid_type' is invalid. Allowed choices are ad_nrt, ar_cuit, au_abn, au_arn, eu_vat, bh_vat, by_tin, bo_tin, br_cnpj, br_cpf, bg_uic, ca_bn, ca_gst_hst, ca_pst_bc, ca_pst_mb, ca_pst_sk, ca_qst, cl_tin, cn_tin, co_nit, cr_tin, hr_oib, do_rcn, ec_ruc, eg_tin, sv_nit, eu_oss_vat, ge_vat, de_stn, hk_br, hu_tin, is_vat, in_gst, id_npwp, il_vat, jp_cn, jp_rn, jp_trn, kz_bin, ke_pin, li_uid, li_vat, my_frp, my_itn, my_sst, mx_rfc, md_vat, ma_vat, nz_gst, ng_tin, no_vat, no_voec, om_vat, pe_ruc, ph_tin, ro_tin, ru_inn, ru_kpp, sa_vat, rs_pib, sg_gst, sg_uen, si_tin, za_vat, kr_brn, es_cif, ch_uid, ch_vat, tw_vat, tz_vat, th_vat, tr_tin, ua_vat, ae_trn, gb_vat, us_ein, uy_ruc, uz_tin, uz_vat, ve_rif, vn_tin.",
    );
  });
});
