# Testing instructions

- To test the code, you need to run `bun run ci:local`, always do this before committing and fix any warnings or errors.

# Commit message instructions

- We use conventional commits WITHOUT a scope, so please follow the following format:

```
<type>: <description>

[optional body]

[optional footer]
```

- The type can be one of the following:

  - fix -> if we are fixing a bug
  - feat -> if we are adding a new feature
  - chore -> if we are doing a small change that doesn't fit in the other categories

- The description should be a short description of the change.
- The body should be used to provide more context about the change.
- The footer is optional and can be used to provide more information about the change.
- Never use breaking changes!
