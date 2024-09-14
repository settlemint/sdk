<p align="center">
  <img src="https://github.com/settlemint/sdk/blob/main/logo.svg" width="200px" align="center" alt="SettleMint logo" />
  <h1 align="center">SettleMint</h1>
  <p align="center">
    ✨ <a href="https://settlemint.com">https://settlemint.com</a> ✨
    <br/>
    Asset Tokenization Starterkit
  </p>
</p>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.com/invite/Mt5yqFrey9">Discord</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Solution Architecture

This solution is a full stack solution that includes a web application and smart contracts. The template is ever improving, and we welcome pull and feature requests on [Github](https://github.com/settlemint/sdk/issues).

### Actors
#### Personas and roles

> Describe and name the different personas and their roles in the use case. These terms and descriptions need to be in the language of the client, so we talk about the same things. Expand with as much background information as possible.

- Platform manager:
    - the platform administrator has final control over the entire platform including managing access rights and the other roles.
    - this manager has control over the registry (to control which tokens are included in the platform) and can administer the factories.
    - this manager is an employee of the contracting company, and we need to keep in mind that this person can change over time
    - the manager can pause/unpause the registry and factories
    - the manager can change the allowed factories
    - the manager can pause/unpause all tokens
    - if auto approve is not enabled, the platform manager can authorize token creation and distribution
    - if auto approve is not enabled, the platform manager can approve users (in cases where kyc is required)

- Platform user:
    - the platform user has two sub roles
        - Token Holder
            - the user has tokens in their self-managed wallet
            - the user can view their holdings and get a nice dashboard view of their portfolio
            - the dashboard has categories and graphs
        - Token Issuer
            - the user can use the create token wizard
            - the user can see the tokens they created or are added to as manager
            - the user can create new distributions
            - the user can see the current distribution / cap table

#### Authentication and signing

This starterkit is pre-configured with a best in class [wallet based authentication toolkit](https://docs.walletconnect.com/appkit/overview). It offers the best experience by allowing a user to log in using a browser or mobile wallet. But also a limited selection of OAuth based social logins and even by email. For public chain use cases it features an onramp feature.

> In case your usecase diverges from the standard, please describe the differences extensively including the reasons for the differences. One options is to use regular OAuth based login options, including options that can integrate with [LDAP systems](https://authjs.dev/getting-started/providers/keycloak) (user needs to supply a configured Keycloak instance). This is not a preferred option as account linking for wallet based actions is exceedingly complex unless all actions happen via the portal service and platform held keys.

Any actions the platform manager executes happen via the portal service and a connected private key in the platform. This way this key can be secured in an HSM and be considered secure. The fact that they actual key is not linked to the manager logging in, means that changes in who executes the action can change or be shared. Apart from transfer, all actions are executed by the platform manager. It severely simplifies on chain permissioning as there is only one administrator key.

Platform users use their own wallet (browser, mobile or social) to sign their actions. Currently this is only transfer.

> In case your usecase diverges from the standard, please describe the differences extensively including the reasons for the differences. Realise that moving away from the standard incurs a high cost in development time (smart contract and frontend) and risk.

### Assets

The starterkit is configured for a single ERC1155 token. This one token contract can be used for multiple assets providing the best UX and lowest operating cost. The template set used is [solidity-token-erc1155](https://github.com/settlemint/solidity-token-erc1155) and can be extended with custom features and restrictions depending on your use case.

A non-exhaustive list of assets that can be tokenized with this contract:

- Equity
- Debt
- Real estate
- Commodities
- Currencies
- Digital assets

These can be extended with custom methods to support more involved use cases like bonds and other structured products.

> It always makes sense to describe the types of assets that are tokenized in this use case. Include a complete data model and explanations on all fields and calculations (e.g. interest, maturity). Make sure to explain the assets in detail, as the development team might not be familiar with them at a detailed level. In case the base token needs to be extended with custom features, please describe these as well.

### Chain

> List the chain this use case will run on and why it is chosen.

## Application
### Description

> Describe the purpose of the application and a list of all the sections, pages and forms that are needed. Include all relevant business logic that needs to be implemented. Flow charts and wireframes are preferred.

- Public pages
    - [x] Homepage template

- Private pages
    - [x] Authentication modals
    - New Tokenization Wizard
      - Intro page
      - Terms and conditions
      - Basic info
          - Token name
          - Token symbol
          - Logo upload
      - Token Economics
          - Max supply (n / y+value)
          - Initial Distribution
              - CSV upload
              - Repeating field
                  - Wallet address
                  - Amount
                  - ID field (contents is free form)
                  - Repeatable upload field for ID documentation
      - Documentation
          - Category
          - Monetary value per token + currency
          - Repeatable Documentation upload
      - Token administrators
          - Add a list of addresses that can manage this token
      - Review + submit
      - Issuance process follow screen
          - email direct link to this
    - User Section
        - User Settings
            - Language selector
            - Currency selector
            - Darkmode selector
        - Dashboard
        - Issued tokens
            - Token dashboard
            - Token holders
                - List
                    - Detail page
                        - Update info
                        - Upload documents
                - New distribution
                    - CSV upload
                    - Repeating field
                        - Wallet address
                        - Amount
                        - ID field (contents is free form)
                        - Repeatable upload field for ID documentation
            - Token actions
                - Audit trail list
        - Portfolio
            - Portfolio Dashboard
            - Token list
                - Transfer
            - Portfolio actions
    - Admin Section
        - Branding
            - Logo
            - Color scheme
            - Enable public pages
        - Categories
            - List = GICS
                - Detail
                - CRUD
        - Tokens
            - Settings:
                - auto approve token creation
                - auto approve new distribution
            - List
                - Detail
                    - Approve token creation
                    - Approve new distribution
                    - Allow user actions
        - Users
            - Settings
                - Auto approve users
            - List
                - Detail
        - Managers
            - List
                - Detail
                    - CRUD


### Integrations

Describe any integrations that this application needs to make. Provide detailed data structures, process flows and intended results



## Development

### Setup

Connect the project to the SettleMint application.

```bash
bunx @settlemint/sdk connect
bunx @settlemint/sdk codegen
```

Generate a secret authentication key for the application:

```bash
bunx auth secret
```

Create the [following schema](https://authjs.dev/getting-started/adapters/hasura#migrations) in Hasura and select `Track all the tables and relationships` when you do

### Hasura

Hasura generates an instant GraphQL API for your database. While you run Hasura inside of SettleMint, during dApp development it is useful to run a local version so any schema changes can be tested and worked on locally and in your CI.

With Hasura migrations we have the ability to version control our database schema and Hasura metadata changes. When we make changes through the Hasura Console, these changes can be saved as migration files. This approach offers several benefits:

Using Hasura Console for migrations is crucial for maintaining a robust and scalable application:

1. **Reproducibility**: You can recreate your entire database schema and Hasura configuration from scratch using migration files.
2. **Rollbacks**: If something goes wrong, you can revert to a previous state of your schema.
3. **Auditing**: Migrations provide a clear history of changes made to your data structure and API.
4. **Consistency**: Avoid discrepancies between different environments by applying the same migrations everywhere.

Working with these migrations is pre-configured in this starterkit, dockerfile and provided Github Actions.

Make sure you have the prerequisite Hasura cli installed:

```bash
# macOS

brew install hasura-cli

# Linux

curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash

# Windows

# Download the binary cli-hasura-windows-amd64.exe available under Assets of the latest release from the GitHub release page: https://github.com/hasura/graphql-engine/releases

#Rename the downloaded file to hasura. You can add the path to the environment variable PATH for making hasura accessible globally.
```

Run the following command to start the hasura server:

```bash
# Start the required docker containers
docker-compose up -d

# Deploy the current migrations (only if there is at least one migration file in the ./database/migrations folder)
bun run hasura:migrate

# Launch the migration aware local console
bun run hasura:console
```

When modifying the schema or inserting data, check the migration checkbox to generate a new migration file. This will be saved in the `./database/migrations` folder. Commit these files into GIT.

### Custom Deployment

Custom deployments allow you to create and deploy your own container images on the SettleMint platform.

To update the custom deployment, run the following command:

```bash
bunx @settlemint/sdk custom-deployment update --image-path <image-path> --port <port>
```

Replace `<image-path>` with the path to the container image you want to use for the custom deployment (eg ghcr.io/my-org/asset-tokenization:latest) and `<port>` with the port exposed by the docker image (by default this will be `3000`).

In the Custom Deployment following environment variables must be set:

| Environment Variable | Description | Example |
|----------------------|-------------|---------|
| SETTLEMINT_PAT_TOKEN | Personal Access Token for authenticating with SettleMint services | sm_pat_x9f2k7m1p3q5r8t0 |
| SETTLEMINT_HASURA_GQL_ADMIN_SECRET | Admin secret for securing Hasura GraphQL API access | 8b3c1a9e5d7f2h4j6l0 |
| SETTLEMINT_HASURA_GQL_ENDPOINT | Endpoint URL for the Hasura GraphQL API | https://hasura-e60f.gke-europe.settlemint.com |
| NEXTAUTH_SECRET | Secret key used by NextAuth for session encryption and security | super_random_secret_key_9876 |
| WALLET_CONNECT_PROJECT_ID | Project ID for WalletConnect integration | 2e4f6h8j0l1n3p5r7t9 |
