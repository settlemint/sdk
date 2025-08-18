# Setup MCP Servers

This command configures all recommended MCP servers for the project.

## Steps

1. **Check existing MCP configuration**

   ```bash
   claude mcp list
   ```

2. **Configure recommended MCP servers**

   - Add each recommended server with appropriate transport type
   - Skip servers that are already configured

3. **Verify all servers are added**

   - Check that all recommended servers are configured
   - Report any servers that failed to add

4. **Verify setup**
   ```bash
   claude mcp list
   ```
   - Confirm all recommended servers are now active

## Server Configurations

Add these recommended servers:

```bash
# Linear - Project management
claude mcp add --transport sse linear https://mcp.linear.app/sse -s user

# Context7 - Library documentation
claude mcp add --transport sse context7 https://mcp.context7.com/sse -s user

# DeepWiki - Advanced documentation search
claude mcp add --transport sse deepwiki https://mcp.deepwiki.com/sse -s user

# Playwright - Browser automation and testing
claude mcp add playwright npx @playwright/mcp@latest -s user

# Sentry - Error tracking and monitoring
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp -s user
```

## Usage

Run this command when:

- Setting up a new development environment
- MCP servers are missing or not properly configured
- After cloning the repository
- When recommended servers have changed

## Authentication Notes

Some servers require authentication:

- **Linear, DeepWiki, Sentry**: May prompt for OAuth authentication in browser on first use
- **Context7**: Public access, no authentication required
- **Playwright**: Runs locally, no authentication required

## Troubleshooting

If a server fails to add:

1. Check the URL is correct
2. Verify the transport type (sse/http) matches the server's requirements
3. Try removing and re-adding the server:
   ```bash
   claude mcp remove <server-name>
   claude mcp add --transport <type> <server-name> <url>
   ```
