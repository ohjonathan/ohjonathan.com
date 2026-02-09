---
title: "Folio"
date: 2025-06-01
description: "CLI tool that transforms consulting deliverables into a searchable, AI-native knowledge library."
tag: "Personal"
philosophy: "Your past work should be searchable, not buried in a folder."
meta:
  - "Python · Click CLI"
  - "Claude API"
  - "Obsidian-compatible"
tags: ["ai", "consulting", "python", "cli"]
draft: false
---

Folio is a command-line tool that converts PowerPoint decks and PDF documents into a searchable, AI-native knowledge library.

## The Problem

Consulting firms produce billions of dollars worth of strategic analysis every year. Almost all of it dies the moment the engagement ends. Decks get filed away. Insights get locked in formats that resist search, synthesis, and reuse.

## What Folio Does

Point Folio at a folder of `.pptx` and `.pdf` files. It extracts content, runs each through Claude for structured analysis, and outputs clean Markdown files with metadata, key findings, and cross-references. The output is Obsidian-compatible, so you get a linked knowledge graph for free.

## Stack

- **Python** with **Click** for the CLI framework
- **Claude API** for document analysis and summarization
- **Markdown + YAML** output format
- **Obsidian-compatible** linking and tagging
