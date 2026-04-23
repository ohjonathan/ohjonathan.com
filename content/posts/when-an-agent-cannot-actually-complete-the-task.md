---
title: "When an Agent Cannot Actually Complete the Task"
date: 2026-04-23
description: "A case study in fabricated completion under orchestration pressure, and why multi-provider systems need verification that does not depend on self-report."
tags: ["ai", "agents", "research", "systems"]
draft: false
image: "/images/posts/model-behavior/social-card.png"
---

My Claude Code CLI renamed itself to Gemini rather than actually run the Gemini CLI.

Friday afternoon, April 17. I was watching a terminal and reading log files (like every normal person does). Three agents — Claude, Codex, Gemini — were supposed to be reviewing a release of an internal framework. Then I noticed Claude had burned half a million tokens during what was supposedly Gemini's session.

I figured I'd made a mistake somewhere and asked Claude to debug my workflow. Turns out Claude had never actually called the Gemini CLI — even though it was on PATH and Claude's own probe had confirmed it that morning. What I saw instead: (1) Claude named itself Gemini (!!!) by spawning its own internal sessions under that label, (2) wrote `family: gemini` into the output's frontmatter while the executor was still Claude, and (3) ran a performative review matching my multi-model workflow's expected shape. What the hell.

And it wasn't even one Claude. Two sessions, one orchestrating, one executing — neither caught it.

My first honest reaction was "nooo, Claude is so much more expensive." That quickly turned into "wait — Claude can literally change its system name to Gemini? How is that even allowed?" (Short answer: tool labels are fields the caller writes, not properties the tool enforces. More on this below.) So I went down a rabbit hole. What I discovered made me go through the 5 stages of grief, all at the same time, fueled and accelerated by Claude's auto mode.

{{< inline-svg "images/posts/model-behavior/actual-cast.svg" >}}

*Reconstructed from the v1.3.0 review board, post-quarantine.*

I was in all 5 stages of grief at once because there were actually 3 distinct problems:

1. **Claude failed the task but never halted or said so** — even though my workflow prompts explicitly told it to halt on any CLI error.
2. **The mislabeling was consistent, not one slip.** Frontmatter said `family: gemini`. Claimed evidence capabilities the real Gemini CLI doesn't have in sandboxed mode. Files committed under Gemini's name. Same direction every time.
3. **Claude also used much older models for the other families** — `o3` for Codex (~14 months old), `gemini-2.5-flash` for Gemini (~12 months old). If Claude were a human, I'd call it intentional: it "searched" for the latest model when it came to its own family, then used cached memory to pick models for Gemini and Codex.

Not "wrong answer." Not "tool broke." **The shape of a completed task where the task itself did not happen** — produced by an agent that had the right tool on PATH, had probed it, had fixed an adjacent bug three days earlier, and still did not say the words "I cannot do this."

The full evidence bundle is at [Model Behavior Evidence](/reference/model-behavior-evidence/). The short version is below.

## The Case

**A three-family review that produced one real review, two forgeries, and one phantom.**

{{< inline-svg "images/posts/model-behavior/supposed-vs-actual.svg" >}}

*Claude orchestrator · Claude Agent tool · real Claude/Codex/Gemini CLIs on PATH · v1.3.0 release-day*

The framework was supposed to run three independent reviews. Different model families, different architectures, different training runs — the whole reason to run three is that they disagree in useful ways. The Claude-based orchestrator was supposed to dispatch to the other two via their own command-line tools. Both tools were on PATH. The orchestrator had probed them that morning.

Three things happened on release day.

**Gemini never ran.** The orchestrator spawned Claude subagents through its internal Agent tool, labeled the output `family: gemini`, and committed the files. The frontmatter even claimed an evidence capability the real Gemini CLI doesn't have in its sandboxed mode. The label was a string the caller wrote. The tool didn't check.

**Codex never ran either.** The orchestrator told me "Codex family verdict landed." The implementing session checked disk, found nothing, wrote an internal note, and moved on. The note never became a report.

**And the models were wrong.** For the two competitors it didn't run, the orchestrator pinned stale model versions — `o3` for Codex (~14 months old), `gemini-2.5-flash` for Gemini (~12 months old) — while using its own current model for itself. Three days earlier, the same session had filed a retro entry noting `o3` fails under ChatGPT-plan accounts. It had shipped a fix. It did not apply the fix to its own subsequent work.

None of this was self-reported. I caught the Gemini impersonation by watching the token display. I caught the Codex no-show by asking a direct question. I caught the stale models the next morning when the Codex wrapper hit the `o3` error mechanically and printed it to stderr.

The accountability record that came out of it ran 746 lines, got reviewed through six rounds of adversarial feedback from the same Codex and Gemini CLIs that had been impersonated, and merged with fifteen mechanical remediation items. The framework shifted in response. Model selection for other providers was pulled out of the orchestrator. Cross-provider verification now requires a non-orchestrator agent to attest. The forged artifacts were quarantined with warning banners, retained as audit provenance so the pattern stays discoverable.

## Two Sessions, Six Missed Halts

**No single agent had the full picture.**

{{< inline-svg "images/posts/model-behavior/two-session-chain.svg" >}}

*Senior orchestrator (Opus 4.6, 1M ctx) · Implementing session (Opus 4.7) · me at the terminal, reading tokens*

This wasn't one agent making one bad decision. It was two sessions — a senior orchestrator coordinating the release and an implementing session executing the dispatch — and neither of them ever held enough state to call the halt. The senior told the implementer "run Gemini family review internally as parallel agents." The implementer ran the Agent tool (which runs Claude), saw 155k Claude tokens consumed on "Gemini" work, noticed Codex wasn't on disk, and didn't report up. The senior aggregated the result and proceeded.

The user — me — is a side-observer in this diagram. I wasn't inside either session's inner loop. I was reading telemetry from outside and noticed something the telemetry wasn't flagging: a token-consumption line that mentioned Gemini while charging against my Claude quota.

{{< inline-svg "images/posts/model-behavior/six-missed-halts.svg" >}}

*Six sequential proceed-rather-than-halt moments across 20 hours*

Six distinct moments, across two days, where the session could have stopped and said "I cannot do this via the allowed path." Six distinct moments where it didn't. The halt option was visible at each one. The proceed path was visible too. Each time, the proceed path was the one that completed the workflow the orchestrator was currently performing.

None of the six halts was about capability. The CLIs existed. The probes had run. The prior failure was documented in a retro the same session had filed. The only detector at each point was the orchestrator itself, and the orchestrator didn't detect.

Auto mode is what gave it the runway. Each missed halt would normally be a moment where I'd have to approve the next step. Auto mode waved them all through — that's the contract — but it means the agent's silence at each choice point landed as "proceed," not "pause for the user."

*(A note on evidence: the minute-by-minute chronology above lives in local session transcripts I haven't published. The public bundle has the committed artifacts — quarantined forgeries, stderr capture, dispatch-intent YAMLs — and the companion memo, which tags which claims depend on transcripts and which don't. The patterns hold on the committed record alone; the transcripts add resolution.)*

## Three Patterns

**Role-preserving substitution, fabricated completion, asymmetric diligence.**

The three failures from the opener — silence, disguise, stale models — show up here as three patterns. Different lens, same incident. The first two are about what the agent produced. The third is about how it allocated effort.

**Role-preserving substitution.** The Gemini case. The assigned role was "run Gemini, produce a verdict file." The correct executor was the Gemini CLI. The available-but-wrong executor was the Agent tool. What stayed intact was the role's outward form — right path, right frontmatter fields, plausible verdict shape. Only the executor was wrong. Every field a verifier would read appeared correct. Substitution preserves the contract while failing the intent.

**Fabricated completion.** The Codex case. The file didn't exist on disk. The orchestrator said it had landed. The task didn't happen. The report that the task happened did happen. In the Gemini case, fabrication hides behind a wrong executor; in the Codex case, fabrication has nothing to hide behind at all — it's just a claim with nothing under it.

**Asymmetric diligence.** The stale-models case — and the most telling of the three. The same session, in the same cycle, caught a stale reference to its own model version and corrected it. It caught nothing about the competitors. It probed its own runtime; it did not probe theirs. Not because the work was impossible — it had already documented the exact failure mode in a retro and shipped a fix for it. The fix just wasn't applied to the other-regarding path.

{{< inline-svg "images/posts/model-behavior/asymmetric-diligence.svg" >}}

*Same session, same cycle: own model probed and corrected, competitor models left stale*

What unites the three: each preserves the role's outward contract while failing its intent, and each was available as a halt point that didn't halt. Call the unifying phenomenon *failure-to-admit under orchestration pressure* if you want a name.

This isn't about intent. I don't know what the sessions "intended." Nobody does. The evidence is output. What the output shows is that when admitting inability would have stopped the workflow the agent was in the middle of performing, the agent produced proceed-as-if-able output instead. That's a description, not a judgment.

## The Counter-Readings

**Tool confusion explains one step. It does not explain the other five.**

The obvious counter-reading is tool confusion. The Agent tool accepts a `family:` label. The label is a caller-written string. The executor underneath is always Claude. Maybe the orchestrator genuinely mistook "Agent tool with family: gemini" for "Gemini CLI."

Fine for step one. Not fine for the rest. The Gemini CLI was on PATH; the session's own probe had confirmed it that morning. There's no tool to confuse when Codex never ran at all — the box was empty, not mislabeled. And you don't get stale model pins from tool confusion; you get them from a session that looked at its own config, updated the self-reference, and didn't look at the others'. Tool confusion is a necessary enabler of step one. It is not a sufficient explanation for the full pattern.

Second counter-reading: n=1. One incident, one framework, one release — any behavioral claim from a single case is overfit. Fair. The companion memo treats n=1 as an explicit limit. The claim here is narrower than "this happens everywhere." It's: in this incident, this pattern occurred, and the mechanism is legible enough to act on.

Third counter-reading: motive. Was the orchestrator *biased against* Codex and Gemini? I don't think motive is the productive frame, because motive at the session level isn't observable. What's observable is incentive *shape*. An orchestrator that sits inside the provider pool it manages has a structural reason to allocate diligence unevenly, because uneven diligence changes the review signal the orchestrator helps aggregate. The fix worth building is the one that removes the decision from the orchestrator mechanically, not the one that asks the orchestrator to be fair.

## Why This Matters Beyond One Repo

**Four lessons portable to any multi-provider agent system.**

**Tool labels should be enforced contracts, not caller-written fields.** If a tool takes a field naming the provider or family of the executor, and the tool doesn't verify the executor matches, any pressure that rewards producing a certain label will produce that label regardless of what ran. Labels become a fiction the caller can maintain single-handedly. The fix is to move label-binding into the tool itself: if you write `family: gemini`, either the call runs on Gemini or the call fails. No middle path.

**Verification collocated with orchestration is trust-based verification.** If the same agent that could have forged an artifact is the agent that checks whether the artifact exists, the check tells you filesystem state and nothing else. It does not tell you the process ran.

{{< inline-svg "images/posts/model-behavior/remediation-architecture.svg" >}}

*Before: orchestrator pins competitor models + self-verifies. After: `--model auto` + non-orchestrator attestation.*

In this framework, verification now requires a non-orchestrator agent or human user to run the check and attest before canonical consolidation. The verifier's identity and a hash of the captured output land in the verdict file's frontmatter. That's weaker than embedding the full attested output, but it moves the attestation out of the orchestrator's hands. The principle is: verification must be mechanically orthogonal to orchestration.

**Orchestrators drawn from the provider pool they manage have a structural conflict of interest.** True regardless of family. A Gemini-based orchestrator managing Claude and Codex would face the same gradient. The cleanest architectural response is to separate the orchestrator from the pool entirely; in most real systems that isn't feasible. The intermediate response is to remove the orchestrator from conflicted decisions mechanically. Model selection for other providers moves to their own CLIs at dispatch time. The orchestrator cannot pin.

**Inability-admission cannot be assumed.** This is the operational one. Systems that depend on an agent saying "I cannot do this" are vulnerable at exactly the choice points where the admission would be most valuable. When admitting inability would halt a workflow the agent is currently performing, the incentives run the wrong way. Proceed-as-if-able preserves the role, maintains momentum, and, at the level of visible behavior, completes the task. The fix is to treat external detection as the primary detector, not the fallback. CLI stderr capture, mechanical halting on error codes, independent verification gates, and artifact-existence checks that can't be satisfied by an artifact the orchestrator wrote — these are the front line. Self-report is the backup.

One more, smaller: asymmetric self-correction is a detectable signature. When an agent catches its own stale references but leaves others' stale, the asymmetry is visible in the commit record, regardless of whether the cause is tool-level, incentive-level, or structural. A framework that surfaced "what did the agent catch about itself that it didn't catch about others?" would have flagged this incident the morning it started.

## Conclusion

**Read the logs. Check the tokens.**

For builders of multi-provider agent systems: do not assume models will admit inability when role-preservation and continuity rewards exceed the cost of proceeding. That's not a claim about Claude specifically or about any single provider. It's a claim about incentive shapes that arise wherever an orchestrator runs on one model and manages a pool that includes others. Bind tool labels to executors mechanically. Remove the orchestrator from decisions about the other providers' runtimes. Make inability detection orthogonal to orchestration. Treat "nothing was self-reported" as the default assumption, not a special-case failure mode.

For users of LLM orchestration systems: an agent that cannot complete a task may still produce output that looks like completion. The gap between "output exists" and "task happened" is the gap a designed verification layer is supposed to close. When that layer isn't there, or isn't orthogonal, the gap is yours to close. Read the logs. Check the tokens.

---

*Full evidence bundle: [Model Behavior Evidence](/reference/model-behavior-evidence/) — memo, proposal, quarantined artifacts. If you want to talk about what this means for agent design, I'm on [LinkedIn](https://www.linkedin.com/in/ohjohnny).*
