"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormMultiStepProvider } from "@/components/ui/form/form-multistep";
import { FormPage } from "@/components/ui/form/form-page";
import { Dropzone } from "@/components/ui/form/form-upload-dropzone";
import { Input } from "@/components/ui/input";
import { portalClient, portalGraphql } from "@/lib/settlemint/portal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { createTokenAction } from "./create-token-action";
import type { CreateTokenSchemaType } from "./create-token-form-schema";
import { CreateTokenSchema, createTokenFormPageFields } from "./create-token-form-schema";

interface CreateTokenFormProps {
  defaultValues: Partial<CreateTokenSchemaType>;
  formId: string;
  className?: string;
}

const CreateTokenReceiptQuery = portalGraphql(`
query CreateTokenReceiptQuery($transactionHash: String!) {
  getTransaction(transactionHash: $transactionHash) {
    receipt {
      contractAddress
      status
      blockNumber
    }
  }
}`);

export function CreateTokenForm({ className, defaultValues, formId, ...props }: CreateTokenFormProps) {
  const [localStorageState, setLocalStorageState] = useLocalStorage<Partial<CreateTokenSchemaType>>(
    "state",
    defaultValues,
  );

  const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormAction(
    createTokenAction,
    zodResolver(CreateTokenSchema),
    {
      actionProps: {
        onSuccess: () => {
          resetFormAndAction();
        },
      },
      formProps: {
        mode: "all",
        defaultValues: {
          ...createTokenFormPageFields,
          ...defaultValues,
          ...localStorageState,
        },
      },
      errorMapProps: {},
    },
  );

  function onSubmit(values: CreateTokenSchemaType) {
    toast.promise(
      async () => {
        const transactionHash = await createTokenAction(values);

        const startTime = Date.now();
        const timeout = 120000; // 2 minutes

        while (Date.now() - startTime < timeout) {
          const txresult = await portalClient.request(CreateTokenReceiptQuery, {
            transactionHash: transactionHash?.data ?? "",
          });

          const receipt = txresult.getTransaction?.receipt;
          if (receipt) {
            if (receipt.status === "Success") {
              return receipt;
            }
            throw new Error("Transaction failed");
          }

          // Wait for 500 milliseconds before the next attempt
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        throw new Error(`Transaction not processed within ${timeout / 1000} seconds`);
      },
      {
        loading: "Creating token...",
        success: (data) => {
          return `${values.tokenName} (${values.tokenSymbol}) created in block ${data.blockNumber} on ${data.contractAddress}`;
        },
        error: (error) => {
          console.error(error);
          return `Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}`;
        },
      },
    );
    // TODO: update the table
  }

  return (
    <div className="TokenizationWizard container mt-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create a new token</CardTitle>
          <CardDescription>Issue a new token.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormMultiStepProvider
            config={{ useLocalStorageState: false, useQueryState: false }}
            formId="create-token-form"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormPage
                  form={form}
                  title="Introduction"
                  controls={{
                    next: { buttonText: "Continue" },
                  }}
                >
                  <div>
                    <p>Easily convert your assets into digital tokens using this step-by-step wizard.</p>
                    <p>Let's get started!</p>
                  </div>
                </FormPage>
                <FormPage
                  form={form}
                  title="Terms & Conditions"
                  controls={{
                    prev: { buttonText: "Back" },
                    next: { buttonText: "Continue" },
                  }}
                >
                  <p>By proceeding with the tokenization process, you agree to the following:</p>
                  <ul>
                    <li>
                      Ensure that all asset details provided are accurate and comply with local laws and regulations.
                    </li>
                    <li>You are solely responsible for the legal implications of tokenizing assets.</li>
                    <li>We do not offer legal or financial advice regarding tokenized assets.</li>
                    <li>Your use of the platform is subject to our Privacy Policy and Terms of Service.</li>
                  </ul>
                  <p>Please review the full terms before continuing.</p>
                  {/* TODO: do we want a formal check box here? */}
                </FormPage>
                <FormPage
                  form={form}
                  title="Token Information"
                  fields={["tokenName", "tokenSymbol"]}
                  withSheetClose
                  controls={{
                    prev: { buttonText: "Back" },
                    submit: { buttonText: "Submit" },
                  }}
                >
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
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Token Logo</FormLabel>
                          <FormControl>
                            <Dropzone
                              label="Click, or drop your logo here"
                              name={field.name}
                              accept={{
                                images: [".jpg", ".jpeg", ".png", ".webp"],
                                text: [],
                              }}
                              maxSize={1024 * 1024 * 10} // 10MB
                              multiple={false}
                            />
                          </FormControl>
                          <FormDescription>This is the logo of the token</FormDescription>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </FormPage>
              </form>
            </Form>
          </FormMultiStepProvider>
        </CardContent>
      </Card>
    </div>
  );
}
