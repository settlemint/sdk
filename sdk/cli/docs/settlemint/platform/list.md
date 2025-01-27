<h1 id="home"><a href="../../settlemint.md">SettleMint CLI</a> > <a href="../platform.md">Platform</a> > List</h1>

<pre>Usage: settlemint platform list|ls [options] [command]

List resources in the SettleMint platform

Options:
  -h, --help                display help for command

Commands:
  <a href="#list-services">services|s</a> [options]      List the application services
  <a href="#list-workspaces">workspaces|w</a> [options]    List workspaces
  <a href="#list-applications">applications|a</a> [options]  List applications
  help [command]            display help for command
</pre>

<h2 id="list-services"><a href="#home">List</a> > Services</h2>

<pre>Usage: settlemint platform list services|s 
Examples:

  # List the application services
  $ settlemint platform list services

  # List the application services in wide format with more information (such as console url)
  $ settlemint platform list services -o wide

  # List the application services in JSON format
  $ settlemint platform list services -o json &gt; services.json

  # List the application services in YAML format
  $ settlemint platform list services -o yaml &gt; services.yaml

  # List the application services for a specific application
  $ settlemint platform list services --application my-app

  # List the application services for a specific application and type
  $ settlemint platform list services --application my-app --type middleware

  # List the application services for multiple types
  $ settlemint platform list services --type blockchain-network blockchain-node middleware

List the application services

Options:
  -app, --application &lt;application&gt;  The application unique name to list the
                                     services in (defaults to application from
                                     env)
  -t, --type &lt;type...&gt;               The type(s) of service to list (choices:
                                     &quot;blockchain-network&quot;, &quot;blockchain-node&quot;,
                                     &quot;custom-deployment&quot;, &quot;insights&quot;,
                                     &quot;integration-tool&quot;, &quot;middleware&quot;,
                                     &quot;private-key&quot;, &quot;storage&quot;)
  -o, --output &lt;output&gt;              The output format (choices: &quot;wide&quot;,
                                     &quot;json&quot;, &quot;yaml&quot;)
  -h, --help                         display help for command
</pre>

<h2 id="list-workspaces"><a href="#home">List</a> > Workspaces</h2>

<pre>Usage: settlemint platform list workspaces|w 
Examples:

  # List workspaces
  $ settlemint platform list workspaces

  # List workspaces in wide format with more information
  $ settlemint platform list workspaces -o wide

  # List workspaces in JSON format
  $ settlemint platform list workspaces -o json &gt; workspaces.json

  # List workspaces in YAML format
  $ settlemint platform list workspaces -o yaml &gt; workspaces.yaml

List workspaces

Options:
  -o, --output &lt;output&gt;  The output format (choices: &quot;wide&quot;, &quot;json&quot;, &quot;yaml&quot;)
  -h, --help             display help for command
</pre>

<h2 id="list-applications"><a href="#home">List</a> > Applications</h2>

<pre>Usage: settlemint platform list applications|a 
Examples:

  # List applications
  $ settlemint platform list applications

  # List applications in wide format with more information
  $ settlemint platform list applications -o wide

  # List applications in JSON format
  $ settlemint platform list applications -o json &gt; applications.json

  # List applications in YAML format
  $ settlemint platform list applications -o yaml &gt; applications.yaml

List applications

Options:
  -w, --workspace &lt;workspace&gt;  The workspace unique name to list applications
                               for (defaults to workspace from env)
  -o, --output &lt;output&gt;        The output format (choices: &quot;wide&quot;, &quot;json&quot;,
                               &quot;yaml&quot;)
  -h, --help                   display help for command
</pre>

