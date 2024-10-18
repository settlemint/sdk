"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Loader2 } from "lucide-react";
import { signUpAction } from "../actions/sign-up";
import { signUpActionSchema } from "../schemas/sign-up-schema";

export function SignUpForm({ provider }: { provider: string }) {
  const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormAction(
    signUpAction,
    zodResolver(signUpActionSchema),
    {
      actionProps: {
        onSuccess: () => {
          resetFormAndAction();
        },
      },
      formProps: {
        mode: "onChange",
        defaultValues: {
          username: "",
          password: "",
          provider,
        },
      },
      errorMapProps: {},
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Create an account"
          )}
        </Button>
      </form>
    </Form>
  );
}
