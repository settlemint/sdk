import type { ReactElement } from "react";

/**
 * The props for the HelloWorld component.
 */
export interface HelloWorldProps {
  name?: string;
}

/**
 * A simple Hello World component that greets the user.
 *
 * @param props - The props for the HelloWorld component.
 * @returns A React element that displays a greeting to the user.
 */
export function HelloWorld({ name = "World" }: HelloWorldProps): ReactElement {
  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800">Hello, {name}!</h1>
      <p className="mt-2 text-gray-600">Welcome to our React component.</p>
    </div>
  );
}
