<h1 id="home"><a href="../../settlemint.md">SettleMint CLI</a> > <a href="../platform.md">Platform</a> > Update</h1>

<pre>Usage: settlemint platform update|u [options] [command]

Update a resource in the SettleMint platform

Options:
  -h, --help                            display help for command

Commands:
  <a href="#update-custom-deployment">custom-deployment|cd</a> [options] &lt;tag&gt;  Update a custom deployment in the
                                        SettleMint platform
  help [command]                        display help for command
</pre>

<h2 id="update-custom-deployment"><a href="#home">Update</a> > Custom deployment</h2>

<pre>Usage: settlemint platform update custom-deployment|cd 
Examples:

  # Update a custom deployment
  $ settlemint settlemint custom-deployment update v1.0.0

  # Update a custom deployment with a specific unique name
  $ settlemint settlemint custom-deployment update v1.0.0 --unique-name my-custom-deployment

Update a custom deployment in the SettleMint platform

Arguments:
  tag                         The tag to update the custom deployment to

Options:
  --unique-name &lt;uniqueName&gt;  The unique name of the custom deployment to
                              update. If not provided, will use
                              SETTLEMINT_CUSTOM_DEPLOYMENT from env
  --prod                      Connect to your production environment
  --wait                      Wait for the custom deployment to be redeployed
  -h, --help                  display help for command
</pre>

