---
title: "How I Built a System to Pursue the Role"
date: 2026-03-29
description: "I built a 6-layer job-search system to pursue the role I actually wanted. Every layer is traceable. The system is the argument."
tags: ["ai", "career", "claude", "systems"]
draft: false
---

My partner and I had four wedding celebrations — the last two back-to-back in Asia, ceremonies for family in different countries. Between the events, I had a lot of downtime in transit. Long drives, slow mornings, hours where the only thing to do was think.

So I thought about what I actually want to do with my career. Not the interview version. The real version. I spent a month using AI to pressure-test my own thinking, and by the time I came home I had exactly one target role I wanted to pursue.

This post isn't the application. It's the system I built to find, evaluate, and execute on the role once I'd identified it.

**The pipeline, end to end:**

- **Layer 1 — Foundation.** A 630-line Master Career Narrative: every role, every project, every bullet, normalized for downstream consumption.
- **Layer 2 — Strategy.** A Role Alignment Framework that classifies companies into archetypes and scores roles into tiers before I look at a JD.
- **Layer 3 — Targeting.** A multi-model research pipeline (Claude + ChatGPT + Gemini) that identified target companies through structured cross-model debate.
- **Layer 4 — Discovery.** A job scanner running on a Raspberry Pi that monitors 190+ companies every 8 hours and delivers matches via Telegram.
- **Layer 5 — Evaluation.** An evaluation workflow that auto-researches each company, runs the full framework, and produces a structured verdict.
- **Layer 6 — Execution.** A 3-file resume skill that tailors content per JD, plus project context for cover letters and essays.

The 190-company scanner was the wide end of the funnel. Anthropic was the only company that survived the kill switch. Most pieces of the system — scanner, evaluator, resume skill — are general-purpose by design. But the only trigger I pulled was for one role.

Different layers used different models and tools. Every decision traceable. Glass box, not black box.

{{< inline-svg "images/posts/one-job/system-overview.svg" >}}

## The Principle: More Turns, Not Less Effort

I use AI to lower the cost of each iteration. Then I spend the savings on more iterations, not less effort. Where someone else takes 2-3 passes on a resume, I take 20+. Nothing is fully automated. I'm responsible for every final decision. But the cost of getting to each decision point is radically lower, so I can make more of them.

And everything is transparent. Every automation is inspectable. Every decision is traceable. You can follow the entire pipeline from input to output and see exactly why each choice was made. I'm responsible for maybe 5% of the raw effort, but 100% of it is visible. I built my system the way I believe AI tools should be built: surface the reasoning, don't hide it.

## Layer 1: The Foundation

**One document feeds everything downstream.**

{{< inline-svg "images/posts/one-job/narrative-structure.svg" >}}

*Markdown · Claude.ai Projects · ~630 lines, 6 sections*

My Master Career Narrative is ~630 lines of Markdown covering my entire professional life. Every experience has format-specific versions — resume, LinkedIn, website — with explicit guidance on what to say, what *not* to say, and when to use each. The resume-ready bullets follow an impact-first format: outcome, then method, then evidence.

The narrative is the database. The applications are queries against it.

## Layer 2: The Strategy

**A job title tells you almost nothing about the actual role.**

{{< inline-svg "images/posts/one-job/framework-structure.svg" >}}

*Markdown · Claude.ai Projects · 4 company archetypes × 4 role tiers × kill switch*

Two documents work together. The Core Function Alignment Framework classifies companies into archetypes (research-led, product-led, sales-led, deployment-led) and scores where a given role sits within that archetype — Core, Core-via-constraint, Core-adjacent, or Support. The Next Role Strategy tracks four specific gaps I'm closing and runs a kill switch: four forcing questions that must pass before I invest more time.

The canonical example: when Anthropic posted a TPM role alongside the PM role, my framework scored it immediately. The company is Tier 1. The TPM role is Tier 3. Don't confuse the two.

## Layer 3: The Targeting

**Three models debating each other to find the right companies.**

{{< inline-svg "images/posts/one-job/research-pipeline.svg" >}}

*Claude · ChatGPT · Gemini · structured extraction + cross-model debate*

I wrote research prompts and ran them across Claude, ChatGPT, and Gemini simultaneously. An extraction bot pulled structured data from each model's output — same schema, three sources. An orchestration bot identified every point of divergence, framed each as an open question, and fed them back for another round. Structured debate with me as moderator.

The automation handles breadth. The judgment stays with me.

## Layer 4: The Discovery

**A Raspberry Pi scanning 190+ companies while I sleep.**

{{< inline-svg "images/posts/one-job/scanner-pipeline.svg" >}}

*Python · OpenClaw · Gemini · Telegram Bot API · Raspberry Pi · Lever, Greenhouse, Ashby, YC APIs*

Every eight hours, a Python scanner hits four ATS APIs (Lever, Greenhouse, Ashby, YC), deduplicates against everything it's ever seen, and feeds new listings to Gemini for relevance filtering. The filtering criteria were distilled from my career narrative and role alignment framework into a natural-language prompt the model reads on every scan. False positives cost me a glance. False negatives cost me an opportunity.

The scanner is a framework, not a personal tool. All personalization lives in three plain-text config files. Swap one markdown file to change the targeting entirely.

## Layer 5: The Evaluation

**Automatic web research before the framework even runs.**

{{< inline-svg "images/posts/one-job/evaluation-session.svg" >}}

*Claude.ai Project · web_search + web_fetch · 4 persistent knowledge docs*

The evaluation workflow lives in a Claude.ai Project with four strategy documents loaded as persistent knowledge. When I paste a JD, it fetches the company's current stage, funding, headcount, and recent news before making any judgment. Then it runs the full framework: archetype classification, tier assignment, gap closure scores, kill switch. The output is a fixed schema — verdict (Take the call / Explore with caution / Probably pass / Hard pass), tier, scores, and tagged diligence questions. I can read just the top block and know whether the full write-up is worth my time.

## Layer 6: The Execution

**A decision engine, not a template.**

{{< inline-svg "images/posts/one-job/execution-pipeline.svg" >}}

*Claude Skill (SKILL.md) · Node.js docx library · LibreOffice headless · pdfinfo*

The resume skill is three files. `SKILL.md` has the logic: three tone profiles (BUILDER / PRODUCT / OPERATOR), bullet selection rules, language mirroring. `bullets.md` is every resume-usable bullet, pre-extracted with impact-first restructuring. `formatting.md` is the visual spec down to DXA margins. When I paste a JD, it selects a tone profile, picks which engagements to feature, reorders sections, writes a Node.js script to generate the .docx, and validates it fits on one page.

For Anthropic, it put Ontos before the GenAI Platform — CLI tool applying for a CLI tool PM role. It swapped my weakest bullet for the Ada build. Encoded logic, not random choices.

Cover letters and essays aren't a separate skill — they're handled by the project system prompt. Resumes benefit from systematic rules. Essays benefit from iteration. The "Why Anthropic?" essay went through 10+ versions across three separate sessions.

## The Proof Point: Project Ada

**119 scripts. 1.57 million records. Two weeks. One person.**

{{< inline-svg "images/posts/one-job/ada-architecture.svg" >}}

*Python 3.12 · pandas · Cursor with Claude · Anthropic API · React/Vite · 282 commits in 13 days*

At McKinsey, I solo-built an enterprise analytical platform. 114 interactive dashboards, 63 data packages, 177 analytical outputs total. Built with Cursor and Claude in 13 calendar days, now generating content for CIO steering committee presentations.

The classification engine is deliberately rule-based — keyword matching, not LLM inference. Claude handles only the 280 ambiguous edge cases, and a human reviews every one. Twelve codified rules govern the workspace: data lineage on every output, auto-committed artifacts, routed files. The agent operates within a system designed to make it predictable. This is the same boundary that matters in a CLI coding agent: knowing exactly where deterministic tooling ends and LLM inference begins, and making that boundary explicit.

## The Meta Layer

**The process is the proof.**

{{< inline-svg "images/posts/one-job/meta-orchestration.svg" >}}

*Claude Code · Claude.ai web sessions · cross-session human routing*

The "Why Anthropic?" essay was drafted across three separate AI sessions — one with codebase access that scanned 23 repos, one with my career narrative for structural drafts, one for voice and argument. I sat at the center routing outputs between them, moderating disagreements, making the final call on every sentence. No automated handoffs. No single session had the full picture.

The system used to produce this blog post — multi-session orchestration, structured contributor prompts, fact-check gates, human review at every merge — is itself an instance of the system the blog describes. A drafting session wrote prose. A contributor system asked each session to fact-check its own section. An orchestrator assembled the final version. Every claim verified against the session that produced it. The process is the proof.

The architecture scales beyond me. The scanner is a framework — swap three config files. The resume skill is a template for building other skills. The evaluation session is a project setup anyone can replicate.

Yes, I built a multi-model data pipeline, a Raspberry Pi scanner, and a 6-layer architecture to submit one application. Objectively, this is overkill. But the pipeline was never just about applying — it was a sandbox to prove how I believe AI products should be designed: transparent, human-steered, and built to compound.

-----

*This post was written across multiple AI-assisted sessions. The system it describes used different models and tools at different layers. The system is the argument. If you want to see the code, the repos are on [GitHub](https://github.com/ohjonathan). If you want to talk about the approach, I'm on [LinkedIn](https://linkedin.com/in/ohjohnny).*

*Status: Application submitted. March 2026.*
