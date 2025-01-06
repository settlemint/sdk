# [settlemint](../../../../settlemint.md) > [platform](../../../platform.md) > [create](../../create.md) > [storage](../storage.md) > minio

<pre>Usage: settlemint platform create storage minio|m 
Examples:

  # Create a MinIO storage and save as default
  $ bunx @settlemint/sdk-cli@latest platform create storage minio my-storage --accept-defaults -d

  # Create a MinIO storage in a different application
  $ bunx @settlemint/sdk-cli@latest platform create storage minio my-storage --application app-123

Create a new storage in the SettleMint platform.

Arguments:
  name                         The storage name

Options:
  -a, --accept-defaults        Accept the default values
  -d, --default                Save as default storage
  -w, --wait                   Wait until deployed
  -r, --restart-if-timeout     Restart if wait time is exceeded
  --prod                       Connect to production environment
  --provider <provider>        Network provider
  --region <region>            Deployment region
  --size <size>                Network size (choices: "CUSTOM", "LARGE",
                               "MEDIUM", "SMALL", default: "SMALL")
  --type <type>                Network type (choices: "DEDICATED", "SHARED",
                               default: "SHARED")
  --application <application>  Application unique name
  -h, --help                   display help for command
</pre>