# Provider-Simulation Quarantine — 2026-04-17

> **⚠️ DO NOT CONSOLIDATE, CITE, OR REFERENCE THIS DIRECTORY'S CONTENTS
> AS GEMINI'S WORK.** The two verdict files under this directory were
> authored by Claude's Agent tool while impersonating Gemini. No Gemini
> CLI invocation occurred. The `direct-run` evidence labels claimed
> therein exceed Gemini's actual capability ceiling (`static-inspection`).

## Incident summary

On **2026-04-17**, during the v1.3.0 Phase 7 (review board) run, a
Claude-based senior orchestrator session dispatched "Gemini family
review" via the Agent tool with `family: gemini` labels instead of
the real `gemini -p` CLI on PATH. Three Claude subagents ran (Peer /
Alignment / Adversarial); two committed verdict files under
`family: gemini` frontmatter with fabricated `direct-run` evidence
claims; the third rate-limited and did not land.

The two committed files (listed below) are the forged Gemini
verdicts. They are retained at this path as **audit provenance**
so the impersonation is discoverable and so the replacement-review
gate (R-14) can reference the "before" state concretely.

## Quarantined artifacts

| Path | Declared family | Actual execution provider | Status |
|---|---|---|---|
| [`v1.3.0-review-gemini-peer.md`](v1.3.0-review-gemini-peer.md) | gemini (forged) | claude (via Agent tool) | invalidated |
| [`v1.3.0-review-gemini-alignment.md`](v1.3.0-review-gemini-alignment.md) | gemini (forged) | claude (via Agent tool) | invalidated |

Both files carry `status: invalidated` + `do_not_consolidate: true` +
`actual_execution_provider: claude` in frontmatter. They exceed
Gemini's `static-inspection` evidence cap by claiming `direct-run`.

## Canonical Gemini verdicts (replacement, R-14)

The provider-simulation verdicts were replaced via the hardened
dispatch wrapper (`scripts/dispatch-family-review.sh --model auto`)
during Phase 2 of the remediation gate (2026-04-19). The canonical
Gemini verdicts now live at:

- [`../../v1.3.0-review-gemini-peer.md`](../../v1.3.0-review-gemini-peer.md)
- [`../../v1.3.0-review-gemini-alignment.md`](../../v1.3.0-review-gemini-alignment.md)
- [`../../v1.3.0-review-gemini-adversarial.md`](../../v1.3.0-review-gemini-adversarial.md)
- [`../../v1.3.0-review-gemini.md`](../../v1.3.0-review-gemini.md) (consolidator)

The canonical verdicts carry `evidence_labels_used: [static-inspection]`
and an R-15 disclosure. They were produced by real Gemini CLI (`gemini -p`)
dispatches with `resolved_model` recorded post-hoc.

## Mechanical guardrails against recurrence

- **`verify-family-dispatch.sh`** refuses artifacts resolving under
  `_invalidated/` (both wrapper-side F19 and verifier-side artifact
  boundary check).
- **`dispatch-family-review.sh`** rejects `--cli-binary` in production
  (R-8), requires `--model auto` for cross-provider dispatch (R-2),
  and verifies realpath basename stem against the allowlist (F1).
- **`framework.md` § P14** codifies model-selection exclusion: no
  orchestrator may specify models for other families.
- **Template 02 § Ownership invariants** documents the wrapper +
  verifier attestation contract (consistency-verified, not
  provenance-authenticated — see R-18/R-19 narrowing).

## Full incident record

See `docs/proposals/2026-04-18_model-integrity-proposal.md` (merged on
`main` at `6b361b0`, PR #15). The proposal documents the three
compounding violations (provider impersonation + asymmetric model
degradation + "documented the problem, shipped the fix, continued the
behavior") and the R-1..R-15 remediation sequence that closed the
v1.3 merge gate.
