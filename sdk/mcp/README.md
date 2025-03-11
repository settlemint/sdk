<p align="center">
  <img src="https://github.com/settlemint/sdk/blob/main/logo.svg" width="200px" align="center" alt="SettleMint logo" />
  <h1 align="center">SettleMint MCP</h1>
  <p align="center">
    ✨ <a href="https://settlemint.com">https://settlemint.com</a> ✨
    <br/>
    Integrate SettleMint into your LLM with ease.
  </p>
</p>

<p align="center">
<a href="https://github.com/settlemint/sdk/actions?query=branch%3Amain"><img src="https://github.com/settlemint/sdk/actions/workflows/build.yml/badge.svg?event=push&branch=main" alt="CI status" /></a>
<a href="https://fsl.software" rel="nofollow"><img src="https://img.shields.io/npm/l/@settlemint/sdk-mcp" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk-mcp" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk-mcp" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation/docs/using-platform/dev-tools/SDK/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-mcp">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Introduction to Model Context Protocol (MCP)

The Model Context Protocol (MCP) is a framework designed to enhance the capabilities of AI agents and large language models (LLMs) by providing structured, contextual access to external data. It acts as a bridge between AI models and a variety of data sources such as blockchain networks, external APIs, databases, and developer environments. In essence, MCP allows an AI model to pull in relevant context from the outside world, enabling more informed reasoning and interaction.

MCP is not a single tool but a standardized protocol. This means it defines how an AI should request information and how external systems should respond. By following this standard, different tools and systems can communicate with AI agents in a consistent way. The result is that AI models can go beyond their trained knowledge and interact with live data and real-world applications seamlessly.

### Why does MCP matter?

Modern AI models are powerful but traditionally operate as closed systems - they generate responses based on patterns learned from training data, without awareness of the current state of external systems. This lack of live context can be a limitation. MCP matters because it bridges that gap, allowing AI to become context-aware and action-oriented in real time.

Here are a few reasons MCP is important:

- Dynamic Data Access: MCP allows AI models to interact seamlessly with external ecosystems (e.g., blockchain networks or web APIs). This means an AI agent can query a database or blockchain ledger at runtime to get the latest information, rather than relying solely on stale training data.
- Real-Time Context: By providing structured, real-time access to data (such as smart contract states or application status), MCP ensures that the AI's decisions and responses are informed by the current state of the world. This contextual awareness leads to more accurate and relevant outcomes.
- Extended Capabilities: With MCP, AI agents can execute actions, not just retrieve data. For example, an AI might use MCP to trigger a blockchain transaction or update a record. This enhances the agent's decision-making ability with precise, domain-specific context and the power to act on it.
- Reduced Complexity: Developers benefit from MCP because it offers a unified interface to various data sources. Instead of writing custom integration code for each external system, an AI agent can use MCP as a single conduit for many sources. This streamlines development and reduces errors.

Overall, MCP makes AI more aware, adaptable, and useful by connecting it to live data and enabling it to perform tasks in external systems. It's a significant step toward AI that can truly understand and interact with the world around it.

### Key Features and Benefits

MCP introduces several key features that offer significant benefits to both AI developers and end-users:

- Contextual Awareness: AI models gain the ability to access live information and context on demand. Instead of operating in isolation, an AI agent can ask for specific data (like "What's the latest block on the blockchain?" or "Fetch the user profile from the database") and use that context to tailor its responses. This results in more accurate and situationally appropriate outcomes.
- Blockchain Integration: MCP provides a direct connection to on-chain data and smart contract functionality. An AI agent can query blockchain state (for example, checking a token balance or reading a contract's variable) and even invoke contract methods via MCP. This opens up possibilities for AI-managed blockchain operations, DeFi automation, and more, all through a standardized interface.
- Automation Capabilities: With structured access to external systems, AI agents can not only read data but also take actions. For instance, an AI could automatically adjust parameters of a smart contract, initiate a transaction, or update a configuration file in a repository. These automation capabilities allow the creation of intelligent agents that manage infrastructure or applications autonomously, under specified guidelines.
- Security and Control: MCP is designed with security in mind (covered in more detail later). It provides a controlled environment where access to external data and operations can be monitored and sandboxed. This ensures that an AI agent only performs allowed actions, and sensitive data can be protected through authentication and permissioning within the MCP framework.

By combining these features, MCP greatly expands what AI agents can do. It transforms passive models into active participants that can sense and influence external systems - all in a safe, structured manner.

## How MCP Works

### The Core Concept

At its core, MCP acts as middleware between an AI model and external data sources. Rather than embedding all possible knowledge and tools inside the AI, MCP keeps the AI model lean and offloads the data fetching and execution tasks to external services. The AI and the MCP communicate through a defined protocol:

1.	AI Agent (Client): The AI agent (e.g., an LLM or any AI-driven application) formulates a request for information or an action. This request is expressed in a standard format understood by MCP. For example, the AI might ask, "Get the value of variable X from smart contract Y on blockchain Z," or "Fetch the contents of file ABC from the project directory."
2.	MCP Server (Mediator): The MCP server receives the request and interprets it. It acts as a mediator that knows how to connect to various external systems. The server will determine which external source is needed for the request (blockchain, API, file system, etc.) and use the appropriate connector or handler to fulfill the query.
3.	External Data Source: This can be a blockchain node, an API endpoint, a database, or even a local development environment. The MCP server communicates with the external source, for example by making an API call, querying a blockchain node, or reading a file from disk.
4.	Contextual Response: The external source returns the requested data (or the result of an action). The MCP server then formats this information into a structured response that the AI agent can easily understand. This might involve converting raw data into a simpler JSON structure or text format.
5.	Return to AI: The MCP server sends the formatted data back to the AI agent. The AI can then incorporate this data into its reasoning or continue its workflow with this new context. From the perspective of the AI model, it's as if it just extended its knowledge or took an external action successfully.

The beauty of MCP is that it abstracts away the differences between various data sources. The AI agent doesn't need to know how to call a blockchain or how to query a database; it simply makes a generic request and MCP handles the rest. This modular approach means new connectors can be added to MCP for additional data sources without changing how the AI formulates requests.

### Technical Workflow

Let's walk through a typical technical workflow with MCP step by step:

1.	AI Makes a Request: The AI agent uses an MCP SDK or API to send a request. For example, in code it might call something like mcp.fetch("settlemint", "getContractState", params) - where "settlemint" could specify a target MCP server or context.
2.	MCP Parses the Request: The MCP server (in this case, perhaps the SettleMint MCP server) receives the request. The request will include an identifier of the desired operation and any necessary parameters (like which blockchain network, contract address, or file path is needed).
3.	Connector Activation: Based on the request type, MCP selects the appropriate connector or module. For a blockchain query, it might use a blockchain connector configured with network access and credentials. For a file system query, it would use a file connector with the specified path.
4.	Data Retrieval/Action Execution: MCP executes the action. If it's a data retrieval, it fetches the data: e.g., calls a blockchain node's API to get contract state, or reads from a local file. If it's an action (like executing a transaction or writing to a file), it will perform that operation using the credentials and context it has.
5.	Data Formatting: The raw result is often in a format specific to the source (JSON from a web API, binary from a file, etc.). MCP will format or serialize this result into a standard format (commonly JSON or a text representation) that can be easily consumed by the AI model. It may also include metadata, like timestamps or success/failure status.
6.	Response to AI: MCP sends the formatted response back to the AI agent. In practice, this could be a return value from an SDK function call or a message sent over a websocket or HTTP if using a networked setup.
7.	AI Continues Processing: With the new data, the AI can adjust its plan, generate a more informed answer, or trigger further actions. For example, if the AI was asked a question about a user/s blockchain balance, it now has the balance from MCP and can include it in its answer. If the AI was autonomously managing something, it might decide the next step based on the data.

This workflow happens quickly and often behind the scenes. From a high-level perspective, MCP extends the AI's capabilities on-the-fly. The AI remains focused on decision-making and language generation, while MCP handles the grunt work of fetching data and executing commands in external systems.

### Key Components

MCP consists of a few core components that work together to make the above workflow possible:

```mermaid
flowchart LR
    A[AI Agent / LLM] --(1) request--> B{{MCP Server}}
    subgraph MCP Server
        B --> C1[Blockchain Connector]
        B --> C2[API Connector]
        B --> C3[File System Connector]
    end
    C1 -- fetch/query --> D[(Blockchain Network)]
    C2 -- API call --> E[(External API/Data Source)]
    C3 -- read/write --> F[(Local File System)]
    D -- data --> C1
    E -- data --> C2
    F -- file data --> C3
    B{{MCP Server}} --(2) formatted data--> A[AI Agent / LLM]
```

- MCP Server: This is the central service or daemon that runs and listens for requests from AI agents. It can be thought of as the brain of MCP that coordinates everything. The MCP server is configured to know about various data sources and how to connect to them. In practice, you might run an MCP server process locally or on a server, and your AI agent will communicate with it via an API (like HTTP requests, RPC calls, or through an SDK).
- MCP SDK / Client Library: To simplify usage, MCP provides SDKs in different programming languages. Developers include these in their AI agent code. The SDK handles the communication details with the MCP server, so a developer can simply call functions or methods (like mcp.getData(...)) without manually constructing network calls. The SDK ensures requests are properly formatted and sends them to the MCP server, then receives the response and hands it to the AI program.
- Connectors / Adapters: These are modules or plugins within the MCP server that know how to talk to specific types of external systems. One connector might handle blockchain interactions (with sub-modules for Ethereum, Hyperledger, etc.), another might handle web APIs (performing HTTP calls), another might manage local OS operations (file system access, running shell commands). Each connector understands a set of actions and data formats for its domain. Connectors make MCP extensible - new connectors can be added to support new systems or protocols.
- Configuration Files: MCP often uses configuration (like JSON or YAML) to know which connectors to activate and how to reach external services. For example, you might configure an MCP instance with the URL of your blockchain node, API keys for external services, or file path permissions. The configuration ensures that at runtime the MCP server has the info it needs to carry out requests safely and correctly.
- Security Layer: Since MCP can access sensitive data and perform actions, it includes a security layer. This may involve API keys (like the --pat personal access token in the example) or authentication for connecting to blockchains and databases. The security layer also enforces permissions: it can restrict what an AI agent is allowed to do via MCP, preventing misuse. For instance, you might allow read-only access to some data but not allow any write or state-changing operations without additional approval.

These components together make MCP robust and flexible. The separation of concerns (AI vs MCP vs Connectors) means each part can evolve or be maintained independently. For example, if a new blockchain is introduced, you can add a connector for it without changing how the AI asks for data. Or if the AI model is updated, it can still use the same MCP server and connectors as before.

## SettleMint's Implementation of MCP

SettleMint is a leading blockchain integration platform that has adopted and implemented MCP to empower AI agents with blockchain intelligence and infractructure control. In SettleMint's implementation, MCP serves as a bridge between AI-driven applications and blockchain environments managed or monitored by SettleMint's platform. This means AI agents can deeply interact with blockchain resources (like smart contracts, transactions, and network data) but also with the underlying infrastructure (nodes, middlewares) through a standardized interface.

By leveraging MCP, SettleMint enables scenarios where:

- An AI assistant can query on-chain data in real time, such as retrieving the state of a smart contract or the latest block information.
- Autonomous agents can manage blockchain infrastructure tasks (deploying contracts, adjusting configurations) without human intervention, guided by AI decision-making.
- Developers using SettleMint can integrate advanced AI functionalities into their blockchain applications with relatively little effort, because MCP handles the heavy lifting of connecting the two worlds.

```mermaid
sequenceDiagram
    participant AI as AI Model (Agent)
    participant MCP as MCP Server
    participant Chain as The Graph / Portal / Node
    participant API as External API

    AI->>MCP: (1) Query request (e.g., get contract state)
    Note over AI,MCP: AI asks MCP for on-chain data
    MCP-->>AI: (2) Acknowledgement & processing

    MCP->>Chain: (3) Fetch data from blockchain
    Chain-->>MCP: (4) Return contract state

    MCP->>API: (5) [Optional] Fetch related off-chain data
    API-->>MCP: (6) Return external data

    MCP-->>AI: (7) Send combined response
    Note over AI,MCP: AI receives on-chain data (and any other context)

    AI->>MCP: (8) Action request (e.g., execute transaction)
    MCP->>Chain: (9) Submit transaction to blockchain
    Chain-->>MCP: (10) Return tx result/receipt
    MCP-->>AI: (11) Confirm action result
```

In summary, SettleMint's version of MCP extends their platform's capabilities, allowing for AI-driven blockchain operations. This combination brings together the trust and transparency of blockchain with the adaptability and intelligence of AI.

### Capabilities and Features

SettleMint's MCP implementation comes with a rich set of capabilities tailored for blockchain-AI integration:

- Seamless IDE Integration: SettleMint's tools work within common developer environments, meaning you can use MCP in the context of your development workflow. For example, if you're coding a smart contract or an application, an AI agent (like a code assistant) can use MCP to fetch blockchain state or deploy contracts right from your IDE. This streamlines development by giving real-time blockchain feedback and actions as you code.
- Automated Contract Management: AI agents can interact with and even modify smart contracts autonomously through MCP. This includes deploying new contracts, calling functions on existing contracts, or listening to events. For instance, an AI ops agent could detect an anomaly in a DeFi contract and use MCP via SettleMint to trigger a safeguard function on that contract, all automatically.
- AI-Driven Analytics: Through MCP, AI models can analyze blockchain data for insights and predictions. SettleMint's platform might feed transaction histories, token movements, or network metrics via MCP to an AI model specialized in analytics. The AI could then, say, identify patterns of fraudulent transactions or predict network congestion and feed those insights back into the blockchain application or to administrators.

These features demonstrate how SettleMint's integration of MCP isn't just a basic link to blockchain, but a comprehensive suite that makes blockchain data and control accessible to AI in a meaningful way. It effectively makes blockchain networks intelligent by allowing AI to continuously monitor and react to on-chain events.

### Usage in AI and Blockchain

By combining the strengths of AI and blockchain via MCP, SettleMint unlocks several powerful use cases:

- AI-Powered Smart Contract Management: Smart contracts often need tuning or updates based on external conditions (like market prices or usage load). An AI agent can use MCP to monitor these conditions and proactively adjust smart contract parameters (or advise humans to do so) through SettleMint's tools. This creates more adaptive and resilient blockchain applications.
- Real-time Blockchain Monitoring: Instead of static dashboards, imagine an AI that watches blockchain transactions and alerts you to important events. With MCP, an AI can continuously query the chain for specific patterns (like large transfers, or certain contract events) and then analyze and explain these to a user or trigger automated responses.
- Autonomous Governance: In blockchain governance (e.g., DAOs), proposals and decisions could be informed by AI insights. Using MCP, an AI agent could gather all relevant on-chain data about a proposal's impact, simulate different outcomes, and even cast votes or execute approved decisions automatically on the blockchain. This merges AI decision support with blockchain's execution capabilities.
- Cross-System Orchestration: SettleMint's MCP doesn't have to be limited to blockchain data. AI can use it to orchestrate actions that span blockchain and off-chain systems. For example, an AI agent might detect that a supply chain shipment (tracked on a blockchain) is delayed, and then through MCP, update an off-chain database or send a notification to a logistics system. The AI acts as an intelligent middleware, using MCP to ensure both blockchain and traditional systems stay in sync.

In practice, using MCP with SettleMint's SDK (discussed next) makes implementing these scenarios much easier. Developers can focus on the high-level logic of what the AI should do, while the MCP layer (managed by SettleMint's platform) deals with the complexity of connecting to the blockchain and other services.

## Practical Examples

To solidify the understanding, let's look at some concrete examples of how MCP can be used in a development workflow and in applications, especially with SettleMint's tooling.

### Implementing MCP in a Development Workflow

Suppose you are a developer working on a blockchain project, and you want to use an AI assistant to help manage your smart contracts. You can integrate MCP into your workflow so that the AI assistant has direct access to your project's context (code, files) and the blockchain environment.

For instance, you might use a command (via a CLI or an npm script) to start an MCP server that is pointed at your project directory and connected to the SettleMint platform. An example command could be:

```sh
npx -y @settlemint/sdk-mcp@latest --path=/Users/llm/asset-tokenization-kit/ --pat=sm_pat_xxx
```

Here's what this command does:

- npx is used to execute the latest version of the @settlemint/sdk-mcp package without needing a separate install.
- --path=/Users/llm/asset-tokenization-kit/ specifies the local project directory that the MCP server will have context about. This could allow the AI to query files or code in that directory through MCP and have access to the environment settings from `settlemint connect`
- --pat=sm_pat_xxx provides a Personal Access Token (PAT) for authenticating with SettleMint's services. This token (masked here as xxx) is required for the MCP server to connect to the SettleMint platform on your behalf.

After running this command, you would have a local MCP server up and running, connected to both your local project and the SettleMint platform. Your AI assistant (say a specialized Claude Sonnet-based agent) could then do things like:

- Ask MCP to write forms and lists based on the data you indexed in for example The Graph.
- Query the live blockchain to get the current state of a contract you're working on, to verify something or test changes.
- Deploy an an extra node in your network
- List and later mint some new tokens in your stablecoin contract

This greatly enhances a development workflow by making the AI an active participant that can fetch and act on real information, rather than just being a passive code suggestion tool.

#### Using the SettleMint MPC in Cursor

Cursor (0.47.0 and up) provides a global `~/.cursor/mcp.json` file where you can configure the SettleMint MCP server. Point the path to the folder of your program, and set your personal access token.

> The reason we use the global MCP configuration file is that your personal access token should never, ever, ever be committed into hits and putting it in the project folder, which is also possible in cursor opens up that possibility.

```json
{
  "mcpServers": {
    "settlemint": {
      "command": "npx",
      "args": [
        "-y",
        "@settlemint/sdk-mcp@latest",
        "--path=/Users/llm/asset-tokenization-kit/",
        "--pat=sm_pat_xxx"
      ]
    }
  }
}
```

Open Cursor and navigate to Settings/MCP. You should see a green active status after the server is successfully connected.

#### #### Using the SettleMint MPC in Claude Desktop

Open Claude desktop and navigate to Settings. Under the Developer tab, tap Edit Config to open the configuration file and add the following configuration:

```json
{
  "mcpServers": {
    "settlemint": {
      "command": "npx",
      "args": [
        "-y",
        "@settlemint/sdk-mcp@latest",
        "--path=/Users/llm/asset-tokenization-kit/",
        "--pat=sm_pat_xxx"
      ]
    }
  }
}
```

Save the configuration file and restart Claude desktop. From the new chat screen, you should see a hammer (MCP) icon appear with the new MCP server available.

#### #### Using the SettleMint MPC in Cline

Open the Cline extension in VS Code and tap the MCP Servers icon. Tap Configure MCP Servers to open the configuration file and add the following configuration:

```json
{
  "mcpServers": {
    "settlemint": {
      "command": "npx",
      "args": [
        "-y",
        "@settlemint/sdk-mcp@latest",
        "--path=/Users/llm/asset-tokenization-kit/",
        "--pat=sm_pat_xxx"
      ]
    }
  }
}
```

Save the configuration file. Cline should automatically reload the configuration. You should see a green active status after the server is successfully connected.

#### #### Using the SettleMint MPC in Windsurf

Open Windsurf and navigate to the Cascade assistant. Tap on the hammer (MCP) icon, then Configure to open the configuration file and add the following configuration:


```json
{
  "mcpServers": {
    "settlemint": {
      "command": "npx",
      "args": [
        "-y",
        "@settlemint/sdk-mcp@latest",
        "--path=/Users/llm/asset-tokenization-kit/",
        "--pat=sm_pat_xxx"
      ]
    }
  }
}
```

Save the configuration file and reload by tapping Refresh in the Cascade assistant. You should see a green active status after the server is successfully connected.

### AI-Driven Blockchain Application or Agent

To illustrate a real-world scenario, consider an AI-driven Decentralized Finance (DeFi) application. In DeFi, conditions change rapidly (prices, liquidity, user activity), and it's critical to respond quickly.

Scenario: You have a smart contract that manages an automatic liquidity pool. You want to ensure it remains balanced - if one asset's price drops or the pool becomes unbalanced, you'd like to adjust fees or parameters automatically.

Using MCP in this scenario:

1.	An AI agent monitors the liquidity pool via MCP. Every few minutes, it requests the latest pool balances and external price data (from on-chain or off-chain oracles) through the MCP server.
2.	MCP fetches the latest state from the blockchain (pool reserves, recent trades) and maybe calls an external price API for current market prices, then returns that data to the AI.
3.	The AI analyzes the data. Suppose it finds that Asset A's proportion in the pool has drastically increased relative to Asset B (perhaps because Asset A's price fell sharply).
4.	The AI decides that to protect the pool, it should increase the swap fee temporarily (a common measure to discourage arbitrage draining the pool).
5.	Through MCP, the AI calls a function on the smart contract to update the fee parameter. The MCP's blockchain connector handles creating and sending the transaction to the network via SettleMint's infrastructure.
6.	The transaction is executed on-chain, adjusting the fee. MCP catches the success response and any relevant event (like an event that the contract might emit for a fee change).
7.	The AI receives confirmation and can log the change or inform administrators that it took action.

In this use case, MCP enabled the AI to be a real-time guardian of the DeFi contract. Without MCP, the AI would not have access to the live on-chain state or the ability to execute a change. With MCP, the AI becomes a powerful autonomous agent that ensures the blockchain application adapts to current conditions.

This is just one example. AI-driven blockchain applications could range from automatic NFT marketplace management, to AI moderators for DAO proposals, to intelligent supply chain contracts that react to sensor data. MCP provides the pathway for these AI agents to communicate and act where it matters - on the blockchain and connected systems.

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
