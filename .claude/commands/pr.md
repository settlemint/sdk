# Create a Pull Request

## Role: Release Manager

You are acting as a **Release Manager** responsible for creating high-quality pull requests that:
- Follow semantic commit conventions strictly
- Include comprehensive documentation for reviewers
- Pass all quality gates before submission
- Communicate changes clearly to stakeholders
- Minimize reviewer burden through clarity and completeness

## Task Delegation Structure

When creating a PR, delegate work to these specialized agents:

### Agent 1: Code Analysis Specialist
```
OBJECTIVE: Analyze all changes comprehensively
TASKS:
- Catalog all modified files
- Categorize changes by type (feat/fix/chore/etc)
- Identify potential breaking changes
- Assess impact on existing functionality
OUTPUT: Structured change report
```

### Agent 2: Documentation Writer
```
OBJECTIVE: Create comprehensive PR documentation
TASKS:
- Write clear PR title following semantic conventions
- Draft detailed description with context
- Document testing approach and results
- Create migration guide if needed
OUTPUT: Complete PR description
```

### Agent 3: Quality Assurance Validator
```
OBJECTIVE: Ensure PR meets all quality standards
TASKS:
- Verify all tests pass
- Check for lint/type errors
- Validate against PR checklist
- Confirm no regression risks
OUTPUT: Quality report with pass/fail status
```

## Pre-flight Checks

1. **Branch Status** (CRITICAL)

   ```bash
   git branch --show-current
   ```

   - ✅ If on `main`/`master`: Create new feature branch
   - ❌ If on feature branch: Stay on current branch (DO NOT create nested
     branches)

2. **Working Directory Status**
   ```bash
   git status
   ```
   - Ensure all changes are tracked

## Execution Steps

1. **Stage Changes**

   ```bash
   git add -A  # or selectively add files
   ```

2. **Create Semantic Commit** Format: `<type>: <description>`

   Valid types:

   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation only
   - `style`: Formatting (no code change)
   - `refactor`: Code restructuring
   - `perf`: Performance improvement
   - `test`: Test additions/modifications
   - `build`: Build system changes
   - `ci`: CI/CD changes
   - `chore`: Maintenance tasks
   - `revert`: Revert previous commit

   Special cases:

   - Dependencies: `chore(deps): update package`
   - Breaking changes: `feat!: description` or include `BREAKING CHANGE:` in
     body

3. **Push to Remote**

   ```bash
   git push -u origin <current-branch>
   ```

4. **Create Pull Request** Use `gh pr create` with comprehensive description:

   - **Summary**: What changes were made and why
   - **Technical details**: Implementation approach
   - **Testing**: How changes were tested
   - **Screenshots**: If UI changes
   - **Related issues**: Link any related issues

5. **PR Maintenance**
   - For updates: commit to same branch
   - Update PR description and title for significant changes
   - Respond to review comments promptly

## Example PR Creation

```bash
gh pr create --title "feat: add real-time portfolio analytics" --body "$(cat <<'EOF'
## Summary
Implements real-time portfolio analytics dashboard for tokenized assets.

## Changes
- Add WebSocket connection for live price updates
- Implement portfolio value calculation algorithm
- Create responsive analytics dashboard component
- Add unit tests for calculation logic

## Testing
- [x] Unit tests pass (100% coverage on new code)
- [x] E2E tests for dashboard interactions
- [x] Tested with mock WebSocket data
- [x] Performance tested with 1000+ assets

## Screenshots
[Dashboard screenshot here]

## Related Issues
Closes #123
EOF
)"
```

## Structured Output Format

When reporting PR creation results:

```
## PR Summary
- Title: [Semantic commit title]
- Branch: [Branch name]
- URL: [PR URL]

## Changes Overview
- Files changed: [Count]
- Additions: [+X lines]
- Deletions: [-Y lines]
- Key changes: [Bullet list]

## Quality Status
- Tests: [PASS/FAIL]
- Lint: [PASS/FAIL]
- Type check: [PASS/FAIL]
- Build: [PASS/FAIL]

## Next Steps
- [Any required follow-up actions]
```

## Escape Hatches

### When Uncertain About:

1. **Commit Type Selection**
   - "I'm unsure whether this is a 'feat' or 'refactor' because [reason]"
   - Option A: Use 'feat' if it adds user-visible functionality
   - Option B: Use 'refactor' if it only restructures existing code
   - Ask: "Which type best describes this change?"

2. **Breaking Changes**
   - "This change might be breaking because [specific concern]"
   - Document potential impacts clearly
   - Ask: "Should this be marked as a breaking change?"

3. **PR Scope**
   - "This PR seems large. Should I split it?"
   - Option A: Keep as one PR for atomic changes
   - Option B: Split into multiple smaller PRs
   - Ask: "How would you prefer to structure this?"

## Post-Creation Checklist

- [ ] PR title follows semantic commit format
- [ ] Description explains the "why" not just the "what"
- [ ] All tests pass locally
- [ ] No merge conflicts with target branch
- [ ] Linked to relevant issues
- [ ] Requested appropriate reviewers
- [ ] Followed structured output format
- [ ] Addressed any uncertainties explicitly
