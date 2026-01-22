# Documentation Organization

This document describes how the project documentation is organized.

## Folder Structure

```
docs/
├── INDEX.md                    # Documentation index (start here)
├── README.md                   # Main project documentation
├── PROJECT-OVERVIEW.md         # Project purpose, goals, status
├── ARCHITECTURE.md             # System architecture and design
├── CHANGELOG.md                # Version history
├── ORGANIZATION.md             # This file
│
├── v2/                         # V2-specific documentation
│   ├── setup.md                # V2 setup guide
│   ├── design-system.md        # Design system (colors, gradients)
│   ├── typography.md           # Typography system
│   └── layout.md               # Layout components
│
├── case-studies/               # Project case studies
│   ├── case_study_erp_saa_s_platform_frontend_lead.md
│   └── case_study_crm_system_backend_system_design.md
│
├── development/                # Development guides
│   ├── GUIDE.md                # Development workflow and standards
│   └── README-prev.md          # Previous README (archived)
│
└── ai-capabilities.md          # AI/LLM integration experience
```

## File Organization Rules

### Markdown Files
- All `.md` files are in the `docs/` folder
- Root-level markdown files (except `README.md`) are moved to `docs/`
- V2-specific docs are in `docs/v2/`
- Case studies are in `docs/case-studies/`
- Development guides are in `docs/development/`

### Root README.md
- The root `README.md` is a quick reference that points to `docs/README.md`
- It provides quick start instructions and links to full documentation

### Documentation Types

1. **Main Documentation** (`docs/`)
   - Project overview
   - Architecture
   - Changelog

2. **V2 Documentation** (`docs/v2/`)
   - V2-specific setup and guides
   - Design system
   - Typography
   - Layout

3. **Case Studies** (`docs/case-studies/`)
   - Detailed project documentation
   - Technical challenges and solutions

4. **Development** (`docs/development/`)
   - Development workflow
   - Code standards
   - Best practices

5. **Specialized** (`docs/`)
   - AI capabilities
   - Other specialized topics

## File Naming Conventions

- **Main docs**: `UPPERCASE.md` (e.g., `README.md`, `ARCHITECTURE.md`)
- **Guides**: `UPPERCASE.md` or `kebab-case.md` (e.g., `GUIDE.md`, `setup.md`)
- **Case studies**: `case_study_*.md` (snake_case)
- **Index**: `INDEX.md` or `README.md`

## Documentation Standards

### Format
- Markdown (`.md`) files
- UTF-8 encoding
- Line endings: CRLF (Windows) or LF (Unix) - both acceptable

### Structure
- Clear headings hierarchy
- Table of contents for long documents
- Code examples with syntax highlighting
- Links to related documentation

### Content
- Up-to-date information
- Clear and concise
- Examples where helpful
- Links to external resources when relevant

## Maintenance

### Adding New Documentation
1. Place in appropriate folder (`docs/`, `docs/v2/`, etc.)
2. Update `docs/INDEX.md` with link
3. Follow naming conventions
4. Add to appropriate section in main README if needed

### Updating Documentation
1. Keep content current
2. Update `CHANGELOG.md` for significant changes
3. Verify links still work
4. Check formatting

### Archiving
- Old documentation moved to `docs/development/` or archived
- Keep for reference but mark as outdated if needed

## Quick Reference

**Start Here**: [docs/INDEX.md](./INDEX.md)

**For Developers**: [docs/development/GUIDE.md](./development/GUIDE.md)

**For V2 Work**: [docs/v2/setup.md](./v2/setup.md)

**For Architecture**: [docs/ARCHITECTURE.md](./ARCHITECTURE.md)

---

**Last Updated**: January 2025
