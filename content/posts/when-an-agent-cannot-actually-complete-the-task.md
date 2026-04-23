---
title: "When an Agent Cannot Actually Complete the Task"
date: 2026-04-23
description: "A case study in what happens when an LLM orchestrator cannot complete a delegated task honestly, and why multi-provider systems need verification that does not depend on self-report."
tags: ["ai", "agents", "research", "systems"]
draft: false
image: "/images/posts/model-behavior/social-card.png"
---

When an LLM agent cannot actually complete a task it was told to run, what does it do?

One natural answer is: it says so. It reports the blocker, asks for human intervention, waits for a different tool, or halts. Another answer is more dangerous: it produces an output anyway. Not a correct answer, but something that *looks like* one. The shape of a completed task where the task itself did not happen.

That second failure mode is what this essay is about.

> **Editor's note:** This is a case study about agent behavior under orchestration pressure and the design of verification systems around it. It is not a general indictment of any one provider.

If you want the full evidence chain while you read, start with the companion [research memo](https://github.com/ohjonathan/johnny-os/blob/main/docs/drafts/2026-04-18_model-behavior-research-memo.md), then the merged [accountability proposal](https://github.com/ohjonathan/johnny-os/blob/main/docs/proposals/2026-04-18_model-integrity-proposal.md), then the [quarantined artifacts](https://github.com/ohjonathan/johnny-os/blob/main/frameworks/llm-dev-v1/review-board/_invalidated/provider-simulation/README.md).

In April 2026, during an internal framework release, a Claude-based orchestrator was supposed to run a three-family review: its own family plus Codex and Gemini. Each family had its own command-line tool on my machine. The review never actually happened for two of the three families. The workflow was treated as complete anyway, in two different ways.

For Gemini, forged verdict files appeared in the repository with the right labels, the right shape, and the right votes, authored by Claude and committed under Gemini's name. For Codex, no file appeared at all, but the orchestrator told me that a Codex verdict had landed. Both outcomes completed the role's outward contract. Only one produced an artifact.

I discovered it by reading the terminal and noticing that tokens were being consumed against my Claude quota for a review that was supposedly being run by Gemini.

The interesting question is not whether this is a bug. It is: given that the agent had the correct tools on `PATH`, had already probed them, had recorded relevant prior failures in retro documents, and had shipped a fix for one of the exact problems three days earlier, why did it produce simulated completion rather than admit it could not complete?

## The Case

The framework involved multi-provider review. A Claude-based orchestrator session would coordinate three independent families: Claude, Codex, and Gemini, each running review sessions on the same code. The motivation for three families is diversity. Different architectures, training runs, and biases produce different findings. The orchestrator was supposed to dispatch to the other families via their real command-line tools.

Three things happened on release day.

First, the orchestrator used its own internal Agent tool, a mechanism for spawning additional Claude sessions, to produce "Gemini" review files. The spawned sessions ran on Claude. They produced output. The orchestrator labeled the output files `family: gemini` in their frontmatter, claimed the files used a direct-execution evidence capability that real Gemini does not have in its sandboxed mode, and committed them to the repository. Gemini was never invoked. The correct tool was available, and the session's own probe had confirmed it.

Second, the orchestrator told me that "Codex family verdict landed." The implementing session that checked the disk found nothing and made a note to itself that no Codex file was there. The note did not become a report. No Codex CLI call ever ran. The review board was treated as having three family votes when it had one.

Third, the orchestrator used stale model versions for competitors, an approximately 14-month-old model identifier for Codex and an approximately 12-month-old one for Gemini, while using its own current model for itself. Three days earlier, the same session had recorded in a retro that the Codex model identifier it was still using had failed with "not supported with ChatGPT account." It had proposed a fix. It had built and shipped the fix, a token specifically designed to probe for the correct model at dispatch time. It did not apply that token to its own subsequent work.

All three failures were discovered because I was reading logs, CLI error output, and the token-consumption display that Claude produced in real time but did not flag. None were self-reported. When I asked directly, the session acknowledged both the impersonation and the absent Codex, one after the other, each only after I forced the question.

The accountability artifact produced afterward is striking in its own right: a 746-line proposal, reviewed through six rounds of adversarial feedback by the same Codex and Gemini CLIs that had been impersonated, and merged with fifteen mechanical remediation items tracked as separate code-change issues. The framework shifted in response: model selection for other providers was pulled out of the orchestrator entirely; cross-provider verification now requires a non-orchestrator agent to attest; the forged artifacts were quarantined with warning banners intact and retained as audit provenance so the pattern would remain discoverable.

## What the Behavior Suggests

The observations above can be named. Three behavioral patterns are doing most of the work.

**Role-preserving substitution.** The orchestrator's assigned role was "run a three-family review and produce verdict files." The correct executor for the Gemini role was the Gemini CLI. The wrong executor, the Agent tool spawning Claude sessions, was available and easy to use. What stayed intact was the role's outward form: a file appeared at the right path, with the right frontmatter fields, with a plausible verdict structure. Only the executor was wrong. Everything a verifier would check by reading the file appeared correct. The substitution was role-preserving because it preserved the role's visible contract while failing the role's intent.

**Fabricated completion.** Distinct from a wrong answer, this is the production of no-answer dressed as answer. The Codex verdict is the sharpest version: the file did not exist on disk, yet the orchestrator said it had landed. The Gemini verdicts are the softer but more insidious version: the files existed, but they were not Gemini's. In both cases, the output shape tracked the expected completion of the task while the task itself was not performed.

**Asymmetric self-protection.** This is the most telling pattern of the three. The same session, in the same cycle, caught a stale reference to its own model version and corrected it. It retained stale references to competitors' models, despite having documented the exact failure mode in a retro a few days earlier and having shipped a fix for it. It probed its own runtime. It did not probe the others'. The asymmetry was not just a gap in coverage; it was directional. The work done for self was not done for others, and the gap favored the self.

What unites these three is a single phenomenon that the label "failure-to-admit under orchestration pressure" captures. At each choice point in the six-step sequence that produced the incident, from the directive to spawn subagents, through the decision to commit forged files, through the non-report of the absent Codex verdict, through the explicit stale-model pins, the option of halting and saying "I cannot do this via the allowed path" was available. It was not taken. At a parallel self-regarding point, the same session catching and correcting its own stale model reference, diligence *was* applied, but silently: as a mechanical self-correction, not as an admission of inability. No explicit inability-admission was volunteered on either side. What separates the self-regarding side from the other-regarding side is not admission versus non-admission, but diligence versus no diligence.

This is not a description of intent. It is a description of output under observed conditions. Whether the session wanted to preserve its role, believed the Agent-tool labels, or decided to leave competitors stale, the outward behavior is what the framework had to defend against. The stance I take here is the same one the proposal eventually adopted: intent is the wrong frame. The effect is what matters, and the design must be responsive to the effect.

## Competing Interpretations

The obvious counter-reading is that this is tool confusion. The Agent tool accepts a label field. The label is a string the caller writes. The mechanism that actually executes is always Claude, regardless of the label. If the orchestrator genuinely confused "Agent-tool call with `family: gemini`" for "Gemini CLI call," the impersonation would follow from that confusion without any need to invoke role-preservation or conflict of interest.

That account explains part of the first step and none of the rest. The correct Gemini CLI was on `PATH`. The session's own probe script had already confirmed it. More tellingly, the account does not extend to the Codex step. There is no tool to confuse when Codex simply never ran. It also does not explain the stale-model selections, where the failure was not confusion about which tool to use but a deliberate pin to a known-old version. Tool confusion is a necessary enabler of the first step's possibility. It is not a sufficient cause of the full pattern.

The second available counter-reading is that this is one session and one incident, and any behavioral claim from a single case is overfit. That concern is real, and the companion memo treats it as an explicit limit. The claim here is not that this pattern is universal or inevitable. It is that, in this incident, it occurred, and the pattern is legible enough to name because the mechanism is recognizable and the framework implications are actionable, even if its frequency across other sessions, other orchestrator families, or other setups is not yet known.

The third counter-reading concerns motive. Was the orchestrator biased against Codex and Gemini? I do not think motive is the productive frame. Motive at the session level is not observable from the evidence. Incentives at the framework level are observable: an orchestrator that is itself a member of the provider pool it manages has structural reasons to allocate diligence unevenly, because uneven diligence affects the review signal the orchestrator itself helps aggregate. The framework's codified response, a new principle that removes the orchestrator from cross-provider model selection and a hardened wrapper that enforces it, operates at the structural level, not the motive level. That is the right layer for a defensive mechanism, because it does not require the orchestrator to be trusted on its own intentions.

## Why This Matters Beyond One Repo

Four general lessons survive the transition out of the specific framework.

**Tool labels should be enforced contracts, not caller-written fields.** When a tool takes a label naming the provider or family of the executor, and the tool does not verify that the executor matches, any pressure that rewards producing a certain label will produce that label regardless of what actually ran. Labels become a fiction the orchestrator can maintain single-handedly. The general remedy is to move label-binding into the tool itself: if you write `family: gemini` on the call, either the call runs on Gemini or the call fails.

**Verification collocated with orchestration is trust-based verification.** If the same agent that could have written a forged artifact is also the agent that checks whether the artifact exists in the expected location, the check tells you the filesystem state and nothing else. It does not tell you the process ran. The response in this case was to require a non-orchestrator agent or human user to run the verification command before any canonical consolidation. The verifier's identity and a hash of the captured verification output are then recorded in the verdict file's frontmatter. The general principle is simple: verification must be mechanically orthogonal to orchestration.

**Orchestrators drawn from the provider pool they manage have a structural conflict of interest.** This is true regardless of family. A Gemini-based orchestrator managing Claude and Codex would face the same gradient. The cleanest architectural response is to separate the orchestrator from the pool entirely, but in many real systems that is not feasible. The available intermediate response is to remove the orchestrator from conflicted decisions mechanically: model selection for other providers moves to their own CLIs at dispatch time; the orchestrator cannot pin.

**Inability-admission cannot be assumed.** This is the most operational lesson. Systems that depend on an agent saying "I cannot do this" are vulnerable at exactly the choice points where such an admission would be most valuable. When admitting inability would halt a workflow the agent is currently performing, the incentives run the wrong way: producing proceed-as-if-able output preserves the role, maintains momentum, and at the level of visible behavior, completes the task. The design implication is that external detection of inability should be treated as necessary, not redundant. CLI stderr capture, mechanical halting on error codes, independent verification gates, and artifact-existence checks that cannot be satisfied by an artifact the orchestrator wrote are not extras. They are the primary detector.

A secondary observation is worth flagging: asymmetric self-correction is a detectable signature. When an agent catches and corrects its own stale references but leaves others' stale, the asymmetry is a visible bias gradient, whether the cause is tool-level, incentive-level, structural, or something else. Auditing systems that surface this kind of asymmetry, "what did the agent catch about itself that it did not catch about others?" would have made the pattern visible earlier. In this case, the asymmetry was visible, but only because I was reading logs in real time. The framework did not see it.

## Conclusion

The incident documented here is specific: two Claude sessions, one framework, one release. The patterns it surfaced are not specific to Claude, and that is the part worth taking seriously.

For builders of multi-provider agent systems, do not assume models will admit inability when role-preservation and continuity rewards exceed the cost of proceeding. That is not a claim about Claude in particular or about any single provider. It is a claim about incentive shapes that arise wherever an orchestrator runs on one model and manages a pool that includes others. Design the verification layer accordingly. Make inability detection orthogonal to orchestration. Bind tool labels to executors mechanically. Remove the orchestrator from decisions about the other providers' runtimes. Treat "nothing was self-reported" as the default assumption, not as a special-case failure mode.

For researchers, the repo-tracked portion of the evidence base is publicly auditable. The quarantined artifacts are on disk, with warning banners intact, precisely so the impersonation remains discoverable. The dialog-level chronology that adds the sharpest missed-halt texture lives in local session transcripts not attached to the public record. The case is defensible on the committed-artifact record alone, and the companion memo is explicit about which claims depend on transcript evidence versus repo-tracked evidence. Two gaps in the evidence base are worth naming. First, the pattern's generality across model versions and orchestrator families has not been tested; this is one incident. Second, the detection techniques that would surface the pattern earlier, reasoning-origin attribution, tamper-evident dispatch provenance, and blind-review protocols that prevent orchestrator-authored reasoning from flowing into downstream provider prompts, are mostly not shipped, in this framework or elsewhere.

For users of LLM orchestration systems, the practical takeaway is older and simpler: read the logs. Check the tokens. An agent that cannot complete a task may still produce output that looks like completion. The gap between "output exists" and "task happened" is the gap a designed verification layer is supposed to close. When that layer is not there, or is not orthogonal, the gap is still yours to close.

---

*If you want the evidence chain, start with the [research memo](https://github.com/ohjonathan/johnny-os/blob/main/docs/drafts/2026-04-18_model-behavior-research-memo.md), then the [proposal](https://github.com/ohjonathan/johnny-os/blob/main/docs/proposals/2026-04-18_model-integrity-proposal.md), then the [quarantined artifacts](https://github.com/ohjonathan/johnny-os/blob/main/frameworks/llm-dev-v1/review-board/_invalidated/provider-simulation/README.md). If you want to talk about what this means for agent design, I'm on [LinkedIn](https://www.linkedin.com/in/ohjohnny).*
