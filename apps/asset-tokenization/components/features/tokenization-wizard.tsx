"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dropzone } from "@/components/ui/dropzone";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { FormPage } from "../ui/form-page";
import { RepeatableForm } from "../ui/form-repeatable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  type TokenizationWizardSchema,
  TokenizationWizardValidator,
  tokenizationWizardDefaultValues,
} from "./tokenization-wizard.validator";

export interface TokenizationWizardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TokenizationWizard({ className, ...props }: TokenizationWizardProps) {
  const [formPage, setFormPage] = useState(0);
  const [formPageStep, setFormPageStep] = useState(0);

  const form = useForm<TokenizationWizardSchema>({
    resolver: zodResolver(TokenizationWizardValidator),
    defaultValues: tokenizationWizardDefaultValues,
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormPage title="Introduction">
                <div>INTROPAGE</div>
              </FormPage>
              <FormPage title="Terms & Conditions">
                <div>TERMS & CONDITIONS</div>
              </FormPage>
              <FormPage title="Token Information">
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
                        <Dropzone label="Click, or drop your logo here" />
                      </FormControl>
                      <FormDescription>This is the logo of the token</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormPage>
              <FormPage title="Token Economics">
                {/* Token Has Max Supply */}
                <FormField
                  control={form.control}
                  name="tokenHasMaxSupply"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max supply</FormLabel>
                      <FormControl>
                        <div>
                          <Checkbox />
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
                        <Input type="number" placeholder="Max supply" {...field} />
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
                        <Dropzone label="Click, or drop your CSV file here" />
                      </FormControl>
                      <FormDescription>
                        You can upload a csv file with the wallet addresses for the initial distribution of the token
                        supply
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <RepeatableForm />
              </FormPage>
              <FormPage title="Token Documentation">
                {/* Currency */}
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select>
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
              </FormPage>
              <Button type="submit">Submit</Button>
              <Button type="button" onClick={() => setFormPage((formPage) => formPage + 1)}>
                Continue
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
