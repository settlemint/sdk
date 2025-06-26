# Quick Reference Guide

## Purpose

Essential Claude Code commands and shortcuts for efficient development workflow.

## Interactive Mode Commands

### Essential Shortcuts

- **Tab** - Command completion
- **↑/↓** - Navigate command history
- **Ctrl+C** - Cancel current operation
- **Ctrl+D** - Exit Claude Code

### Slash Commands

- `/help` - Show all available commands
- `/memory` - Open memory files in system editor
- `/init` - Bootstrap project memory file
- `/clear` - Clear conversation context
- `/exit` - Exit Claude Code

### Quick Memory Addition

Use `#` prefix to quickly add a memory:

```
# Always use Bun instead of npm for this project
# Prefer functional components over class components
# Use 2-space indentation
```

## Command Line Usage

### Basic Commands

```bash
# Start interactive mode
claude

# Run single task
claude "fix the login bug"

# Create commit with message
claude commit

# Show version
claude --version

# Get help
claude --help
```

### Advanced Options

```bash
# Skip API key setup
claude --no-check-api-key

# Use specific model
claude --model claude-3-5-sonnet-20241022

# Custom API endpoint
claude --endpoint https://custom-api.example.com

# Non-interactive permission handling
claude --permission-prompt-tool my-mcp-tool

# Dangerous: Skip all permissions (use with caution!)
claude --dangerously-skip-permissions
```

## Effective Prompting Patterns

### Be Specific

❌ "Fix the bug" ✅ "Fix the login bug where users see a blank screen after
entering wrong credentials"

### Use Step-by-Step

Instead of: "Add user management"

Use:

1. Create a new API endpoint for user CRUD operations
2. Add validation for required fields
3. Write tests for the endpoint
4. Update the frontend to use the new API

### Let Claude Explore

Before: "Add caching to improve performance" Better: First "analyze the current
performance bottlenecks", then "add caching where it would be most effective"

## Common Workflows

### Bug Fixing

```bash
# Understand the issue
claude "analyze the error in logs/error.log"

# Find related code
claude "find all files related to user authentication"

# Fix the issue
claude "fix the null pointer exception in UserService"

# Verify the fix
claude "run tests for UserService"
```

### Feature Development

```bash
# Explore existing patterns
claude "show me how forms are implemented in this project"

# Implement feature
claude "create a contact form with email validation"

# Add tests
claude "write tests for the contact form"

# Create PR
claude commit
claude "create a PR for the contact form feature"
```

### Code Review

```bash
# Analyze changes
claude "review the changes in my current branch"

# Check for issues
claude "check for security vulnerabilities in the new code"

# Improve code quality
claude "suggest improvements for code readability"
```

## MCP Server Quick Commands

If MCP servers are configured:

### Linear

- "Show my assigned Linear issues"
- "Create a Linear issue for this bug"
- "Update Linear issue LIN-123 with progress"

### Context7

- "Get React hooks documentation"
- "Show me Next.js 14 app router examples"
- "Find Prisma query documentation"

### DeepWiki

- "Deep dive into React Server Components"
- "Explain WebAssembly memory model"
- "Research distributed systems consensus"

### Setup MCP Servers

If servers are missing, run: `/setup-mcp`

## Pro Tips

1. **Use Tab Completion**: Don't type full commands, use Tab
2. **History is Your Friend**: Use ↑ to repeat/modify previous commands
3. **Be Conversational**: Claude Code understands context
4. **Iterate**: Start simple, then refine based on results
5. **Trust the Context**: Claude Code remembers your conversation

## Emergency Commands

```bash
# If Claude Code seems stuck
Ctrl+C

# If you need to start fresh
/clear

# If permissions are problematic
claude --dangerously-skip-permissions "emergency fix"

# If API is unresponsive
claude --endpoint https://api.anthropic.com/v1 --check-api-key
```

## Remember

Claude Code is designed to be your AI pair programmer. Describe what you want to
achieve, and it will help you get there. The more specific you are, the better
the results.
