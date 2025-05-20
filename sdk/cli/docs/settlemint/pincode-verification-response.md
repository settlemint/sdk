<h1 id="home"><a href="../settlemint.md">SettleMint CLI</a> > Pincode verification response</h1>

<pre>Usage: settlemint pincode-verification-response|pvr 
Examples:

  # Get pincode verification response for a wallet address
  $ settlemint settlemint pincode-verification-response --wallet-address 0x1234567890123456789012345678901234567890

  # Get pincode verification response for a wallet address and connect to a specific blockchain node
  $ settlemint settlemint pincode-verification-response --wallet-address 0x1234567890123456789012345678901234567890 --blockchain-node my-blockchain-node

Get pincode verification response for a blockchain node

Options:
  --wallet-address &lt;walletAddress&gt;    The wallet address to get pincode
                                      verification response for
  -i, --instance &lt;instance&gt;           The instance to connect to (defaults to
                                      the instance in the .env file)
  --blockchain-node &lt;blockchainNode&gt;  Blockchain Node unique name to get pincode
                                      verification response for
  -h, --help                          display help for command
</pre>

