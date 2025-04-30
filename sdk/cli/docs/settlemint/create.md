<h1 id="home"><a href="../settlemint.md">SettleMint CLI</a> > Create</h1>

<pre>Usage: settlemint create 
Examples:

  # Create a new application from a template
  $ settlemint settlemint create

  # Create a new asset tokenization application
  $ settlemint settlemint create --template asset-tokenization

  # Create a new asset tokenization application from a specific version
  $ settlemint settlemint create --template asset-tokenization --version 1.0.0

Create a new application from a template

Options:
  -n, --project-name &lt;name&gt;  The name for your SettleMint project
  -t, --template &lt;template&gt;  The template for your SettleMint project (run
                             `settlemint platform config` to see available
                             templates)
  -v, --version &lt;version&gt;    Specify the template version to use (defaults to
                             latest stable version)
  -i, --instance &lt;instance&gt;  The instance to connect to
  -h, --help                 display help for command
</pre>

