<h1 id="home"><a href="../../settlemint.md">SettleMint CLI</a> > <a href="../platform.md">Platform</a> > List</h1>

<pre>Usage: settlemint platform list|ls [options] [command]

List resources in the SettleMint platform

Options:
  -h, --help            display help for command

Commands:
  <a href="#list-services">services|s</a> [options]  List the application services
  help [command]        display help for command
</pre>

<h2 id="list-services"><a href="#home">List</a> > Services</h2>

<pre>Usage: settlemint platform list services|s 
Examples:

  # List the application services
  $ settlemint settlemint platform application get

  # List the application services in wide format with more information (such as console url)
  $ settlemint settlemint platform application get -o wide

  # List the application services in JSON format
  $ settlemint settlemint platform application get -o json &gt; services.json

  # List the application services in YAML format
  $ settlemint settlemint platform application get -o yaml &gt; services.yaml

  # List the application services for a specific application
  $ settlemint settlemint platform application get --application my-app

  # List the application services for a specific application and type
  $ settlemint settlemint platform application get --application my-app --type middleware

  # List the application services for multiple types
  $ settlemint settlemint platform application get --type blockchain-network blockchain-node middleware

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

