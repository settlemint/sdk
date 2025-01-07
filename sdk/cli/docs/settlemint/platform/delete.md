<h1 id="home"><a href="../../settlemint.md">SettleMint CLI</a> > <a href="../platform.md">Platform</a> > Delete</h1>

<pre>Usage: settlemint platform delete|d [options] [command]

Delete a resource in the SettleMint platform

Options:
  -h, --help                             display help for command

Commands:
  <a href="#delete-workspace">workspace|w</a> [options] &lt;unique-name&gt;    Delete a workspace in the SettleMint platform. Provide the workspace unique name or use &#039;default&#039; to delete the default workspace from your .env file.
  <a href="#delete-application">application|a</a> [options] &lt;unique-name&gt;  Delete a application in the SettleMint platform. Provide the application unique name or use &#039;default&#039; to delete the default application from your .env file.
  help [command]                         display help for command
</pre>

<h2 id="delete-workspace"><a href="#home">Delete</a> > Workspace</h2>

<pre>Usage: settlemint platform delete workspace|w 
Examples:

  # Deletes the specified workspace by unique name
  $ settlemint platform delete workspace &lt;workspace-unique-name&gt;

  # Deletes the default workspace in the production environment
  $ settlemint platform delete workspace default --prod

  # Force deletes the specified workspace without confirmation
  $ settlemint platform delete workspace &lt;workspace-unique-name&gt; --force

Delete a workspace in the SettleMint platform. Provide the workspace unique
name or use &#039;default&#039; to delete the default workspace from your .env file.

Arguments:
  unique-name            The unique name of the workspace, use &#039;default&#039; to
                         delete the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -f, --force            Force delete the workspace without confirmation
  -h, --help             display help for command
</pre>

<h2 id="delete-application"><a href="#home">Delete</a> > Application</h2>

<pre>Usage: settlemint platform delete application|a 
Examples:

  # Deletes the specified application by unique name
  $ settlemint platform delete application &lt;application-unique-name&gt;

  # Deletes the default application in the production environment
  $ settlemint platform delete application default --prod

  # Force deletes the specified application without confirmation
  $ settlemint platform delete application &lt;application-unique-name&gt; --force

Delete a application in the SettleMint platform. Provide the application unique
name or use &#039;default&#039; to delete the default application from your .env file.

Arguments:
  unique-name            The unique name of the application, use &#039;default&#039; to
                         delete the default one from your .env file

Options:
  -a, --accept-defaults  Accept the default and previously set values
  --prod                 Connect to your production environment
  -f, --force            Force delete the application without confirmation
  -h, --help             display help for command
</pre>

