<h1 id="home"><a href="../settlemint.md">SettleMint CLI</a> > Login</h1>

<pre>Usage: settlemint login 
Examples:

  # Login to your SettleMint account
  $ settlemint login

  # Login to your SettleMint account using a token from STDIN
  $ cat ~/my_token.txt | settlemint login --token-stdin --accept-defaults

Login to your SettleMint account.

Options:
  -a, --accept-defaults      Accept the default and previously set values
  -d, --default              Set this instance as the default
  --token-stdin              Provide a token using STDIN
  -i, --instance &lt;instance&gt;  The instance to login to (defaults to the instance
                             in the .env file)
  -h, --help                 display help for command
</pre>

