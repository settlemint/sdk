"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import Link from "next/link";
import { signInAction } from "../actions/sign-in";
import { signInActionSchema } from "../schemas/sign-in-schema";

export function SignInForm({ provider }: { provider: string }) {
  const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormAction(
    signInAction,
    zodResolver(signInActionSchema),
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
              <FormLabel className="flex items-center">
                Password
                <Link href="/auth/forgot-password" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Log in</Button>
      </form>
    </Form>
  );
}
