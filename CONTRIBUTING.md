# Contributing to New-Snippets

Thank you for your interest in contributing to New-Snippets! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with the following information:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Browser and version information
- Screenshots (if applicable)

### Suggesting Enhancements

We welcome feature suggestions! Please create an issue with:
- A clear, descriptive title
- Detailed description of the proposed feature
- Use cases and benefits
- Any relevant mockups or examples

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our code style guidelines
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Submit a pull request** with a clear description

#### Code Style Guidelines

- Use modern ES6+ JavaScript
- Follow existing code formatting
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable names

#### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:
```
feat: add syntax highlighting support
fix: resolve clipboard copy issue on Firefox
docs: update installation instructions
```

#### Pull Request Process

1. Ensure your code follows the style guidelines
2. Update the README.md with details of changes if applicable
3. Ensure all tests pass (when available)
4. Your PR will be reviewed by maintainers
5. Address any feedback or requested changes
6. Once approved, your PR will be merged

### Development Setup

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed development instructions.

Quick start:
```bash
git clone https://github.com/RoyalKuijpers/New-Snippets.git
cd New-Snippets
npm install
npm run build
```

### Testing

Before submitting your PR, please:
1. Test the extension manually in Chrome/Edge
2. Verify no console errors
3. Test all affected functionality
4. Check that data persists correctly

### Code Review

All submissions require review. We use GitHub pull requests for this purpose. Here's what reviewers look for:
- Code quality and readability
- Adherence to project conventions
- Proper error handling
- Security considerations
- Performance impact

## Questions?

If you have questions about contributing, feel free to:
- Open an issue with the `question` label
- Contact the maintainers
- Check existing issues and pull requests

## License

By contributing to New-Snippets, you agree that your contributions will be licensed under the project's ISC License.

Thank you for contributing! 🎉
