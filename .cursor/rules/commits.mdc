---
description: 
globs: 
alwaysApply: true
---
# Commit Messages and Pull Request Titles

When creating commits or pull requests in this repository, you MUST follow the conventional commit format defined in `.github/release.yml`.

## Format

The general format is: `type(scope): description`

- `type` is required and must be one of the accepted types
- `scope` is optional and goes in parentheses
- `:` colon and space after type/scope
- `description` starts with lowercase

## Accepted Types

Check `.github/labeler.yml` for the current list, which includes:
- `feat`: New features
- `fix`: Bug fixes
- `chore`: Maintenance tasks
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions or modifications
- `build`: Build system changes
- `ci`: CI/CD configuration changes
- `revert`: Reverting previous commits

## Special Cases

### Dependencies
Use specific scope for dependency updates:
- `chore(deps): update dependencies`
- `fix(deps): fix vulnerable dependency`
- `build(deps): update build dependencies`

### Breaking Changes
Mark breaking changes by:
1. Adding `!` after the type/scope: `feat!: change API`
2. Or including `BREAKING CHANGE:` in the commit body

## Examples

✅ Good:
- `feat: add user authentication`
- `fix(api): resolve timeout issue`
- `chore(deps): update react to v18`
- `feat!: redesign API endpoints`
- `docs: update README with new examples`

❌ Bad:
- `Feature: Add user auth` (wrong format)
- `added new feature` (missing type)
- `Fix API` (missing colon and description)

## PR Title = First Commit Message

The PR title should match the format of the main commit message. The labeler will automatically apply labels based on the PR title format.

**Important**: Any PR that doesn't match these patterns will be labeled as "chore" by default.