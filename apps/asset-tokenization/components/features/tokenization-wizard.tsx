"use client";

import { uploadFile } from "@/actions/upload.action";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dropzone } from "@/components/ui/dropzone";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as React from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { FormMultiStepProvider } from "../ui/form-multistep";
import { FormPage } from "../ui/form-page";
import { RepeatableForm } from "../ui/form-repeatable";
import { NumericInput } from "../ui/input-numeric";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  type TokenizationWizardSchema,
  TokenizationWizardValidator,
  tokenizationWizardDefaultValues,
} from "./tokenization-wizard.validator";

export interface TokenizationWizardProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValues: Partial<TokenizationWizardSchema>;
}

export function TokenizationWizard({ className, defaultValues, ...props }: TokenizationWizardProps) {
  const form = useForm<TokenizationWizardSchema>({
    resolver: zodResolver(TokenizationWizardValidator),
    defaultValues: { ...tokenizationWizardDefaultValues, ...defaultValues },
    mode: "all",
  });

  function onSubmit(values: TokenizationWizardSchema) {
    console.log(values);
  }

  return (
    <div className="TokenizationWizard container mt-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create Token</CardTitle>
          <CardDescription>Issue a new token.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormMultiStepProvider
            form={form}
            config={{ useLocalStorageState: true, useQueryState: true, useQueryStateComponent: "FormPage" }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormPage title="Introduction" fields={[]}>
                  <div>INTROPAGE</div>
                </FormPage>
                <FormPage title="Terms & Conditions" fields={[]}>
                  <div>TERMS & CONDITIONS</div>
                </FormPage>
                <FormPage title="Token Information" fields={["tokenName", "tokenSymbol"]}>
                  {/* Token Name */}
                  <FormField
                    control={form.control}
                    name="tokenName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Token name</FormLabel>
                        <FormControl>
                          <Input placeholder="Token Name" {...field} />
                        </FormControl>
                        <FormDescription>This is the name of the token</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Token Symbol */}
                  <FormField
                    control={form.control}
                    name="tokenSymbol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Token Symbol</FormLabel>
                        <FormControl>
                          <Input placeholder="Token Symbol" {...field} />
                        </FormControl>
                        <FormDescription>This is the symbol of the token</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Token Logo */}
                  <FormField
                    control={form.control}
                    name="tokenLogo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Token Logo</FormLabel>
                        <FormControl>
                          <Dropzone label="Click, or drop your logo here" name={field.name} action={uploadFile} />
                        </FormControl>
                        <FormDescription>This is the logo of the token</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormPage>
                <FormPage title="Token Economics" fields={["tokenMaxSupply", "tokenHasMaxSupply", "walletEntries"]}>
                  {/* Token Has Max Supply */}
                  <FormField
                    control={form.control}
                    name="tokenHasMaxSupply"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max supply</FormLabel>
                        <FormControl>
                          <div>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </div>
                        </FormControl>
                        <FormDescription>This enables max supply for the token</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Token Max Supply */}
                  <FormField
                    control={form.control}
                    name="tokenMaxSupply"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max supply</FormLabel>
                        <FormControl>
                          <NumericInput name={field.name} placeholder="Max supply" />
                        </FormControl>
                        <FormDescription>This is the max supply of the token</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Initial distribution */}
                  <FormField
                    control={form.control}
                    name="walletEntriesCsvFileUpload"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload CSV file</FormLabel>
                        <FormControl>
                          <Dropzone label="Click, or drop your CSV file here" name={field.name} action={uploadFile} />
                        </FormControl>
                        <FormDescription>
                          You can upload a csv file with the wallet addresses for the initial distribution of the token
                          supply
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Initial distribution */}
                  <FormField
                    control={form.control}
                    name="walletEntries"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wallets</FormLabel>
                        <FormControl>
                          <RepeatableForm
                            control={form.control}
                            name={field.name}
                            components={[
                              { type: "Input", field: "walletAddress", placeholder: "Wallet" },
                              { type: "NumericInput", field: "amount", placeholder: "Amount" },
                              { type: "Textarea", field: "ID", placeholder: "ID" },
                            ]}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the wallet addresses for the initial distribution of the token supply
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormPage>
                <FormPage title="Token Documentation" fields={["currency"]}>
                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="tokenCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="BONDS">Bonds</SelectItem>
                            <SelectItem value="EQUITIES">Equities</SelectItem>
                            <SelectItem value="DERIVATIVES">Derivatives</SelectItem>
                            <SelectItem value="LOANS">Loans</SelectItem>
                            <SelectItem value="FUNDS">Funds</SelectItem>
                            <SelectItem value="COMMODITIES">Commodities</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>This is the type of financial instrument</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Monetary value */}
                  <FormField
                    control={form.control}
                    name="monetaryValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monetary value</FormLabel>
                        <FormControl>
                          <NumericInput name={field.name} placeholder="Monetary value" />
                        </FormControl>
                        <FormDescription>This is the monetary value per token</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Currency */}
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="AUD">AUD</SelectItem>
                            <SelectItem value="JPY">JPY</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>This is the currency for the monetary value of token</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Documentation upload */}
                  <FormField
                    control={form.control}
                    name="DocumentationFileUploads"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload documentation files</FormLabel>
                        <FormControl>
                          <Dropzone label="Click, or drop your documents here" name={field.name} action={uploadFile} />
                        </FormControl>
                        <FormDescription>You can upload documentation files for the token</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormPage>
                <FormPage title="Token administrators" fields={[]}>
                  {/* Token administrators */}
                  <FormField
                    control={form.control}
                    name="adminWalletAddresses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wallets</FormLabel>
                        <FormControl>
                          <RepeatableForm
                            control={form.control}
                            name={field.name}
                            components={[
                              { type: "Input", field: "walletAddress", placeholder: "Wallet" },
                              { type: "NumericInput", field: "amount", placeholder: "Amount" },
                              { type: "Textarea", field: "ID", placeholder: "ID" },
                            ]}
                          />
                        </FormControl>
                        <FormDescription>Enter the wallet addresses for the Token administrators</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormPage>
                <FormPage title="Review" fields={[]}>
                  <div>Review</div>
                </FormPage>
              </form>
            </Form>
          </FormMultiStepProvider>
        </CardContent>
      </Card>
    </div>
  );
}
