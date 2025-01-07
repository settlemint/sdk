# [settlemint](../../settlemint.md) > [platform](../platform.md) > update

<pre>Usage: settlemint platform update|u [options] [command]

Update a resource in the SettleMint platform

Options:
  -h, --help                                            display help for command

Commands:
  <a href="#update-custom-deployment">custom-deployment|custom</a>-deployments [options] &lt;tag&gt;  Update a custom deployment in the SettleMint platform
  help [command]                                        display help for command
</pre>

<h2 id="update-custom-deployment">
  <a href="../update.md">update</a> > custom-deployment
</h2>

<pre>Usage: settlemint platform update custom-deployment|custom-deployments [options] &lt;tag&gt;

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

