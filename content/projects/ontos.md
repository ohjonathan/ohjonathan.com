---
title: "Project Ontos"
date: 2025-01-01
description: "A local-first AI context management system: a repo-native knowledge graph in markdown + YAML, designed for inspectable, repeatable workflows across AI tools."
tag: "Open Source"
philosophy: "AI context should be readable, not retrievable. Glass box, not black box."
meta:
  - "Python CLI"
  - "PyPI: ontos"
  - "500+ commits"
  - "Apache 2.0"
tags: ["ai", "context-management", "python", "cli"]
draft: true
---

Ontos is a local-first AI context management system. It provides a repo-native knowledge graph built in markdown and YAML, designed for inspectable, repeatable workflows across AI tools.

## The Problem

Most AI context solutions treat knowledge as something to be retrieved — embedded, indexed, and searched through opaque vector databases. This makes AI workflows fragile, non-reproducible, and impossible to inspect. You can't see what the model "knows," and you can't verify its reasoning chain.

## The Approach

Ontos takes the opposite approach: context should be *readable*, not retrievable. Every document lives in your repo as plain markdown with YAML frontmatter. Dependencies are explicit. The knowledge graph is a set of files you can open, read, and version-control.

## How It Works

- **Documents** are markdown files with structured frontmatter (type, status, dependencies)
- **Context maps** are auto-generated tiered indices for AI orientation
- **Session logs** capture what was done, what was decided, and why
- **Validation** enforces dependency depth limits and structural integrity

The CLI (`pip install ontos`) provides commands for map generation, health checks, document queries, and session logging.
