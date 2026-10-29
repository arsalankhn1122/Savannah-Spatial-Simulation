# African Savannah with AI - verified continuation

Use this folder as the submission package. Earlier drafts remain in the parent folder unchanged.

- `REPORT.pdf`: one-page IMRaD report including the model specification.
- `REPORT.md`: editable text of the same report.
- `AI_LOG.md`: session record, limitations, actions, failures, corrections and commit references.
- `SPEC.md`: existing specification plus explicit extension decisions.
- `savannah_baseline.gaml`: completed Unit 1 baseline (F5).
- `savannah_extended.gaml`: baseline plus zebra grazing and lion energy/starvation (E2).
- `COMPARE.md`, `LINE_BY_LINE.md`, `baseline-to-extended.diff`: semantic review and complete line-level comparisons.
- `reference/savannah_unit1.gaml`: unchanged handwritten source.
- `validation/`: real GAMA output, targeted test results and rendered displays.

## Run

Open either production `.gaml` file in GAMA 2025.6.4 and launch `savannah_sim`. The model has no GIS inputs or external libraries. Use the baseline when comparing growth without grazing; use the extended model for the final extension.

## Reproduce checks on this computer

From the course root, run:

```powershell
node 'assignement2/for submition/verified_submission/prepare-tests.cjs'
powershell -NoProfile -ExecutionPolicy Bypass -File 'assignement2/for submition/verified_submission/run-gama.ps1' -Plan 'assignement2/for submition/verified_submission/validation/acceptance.xml' -OutputDirectory 'C:/Users/arsal/Desktop/Spatial Simulation course/tmp/gama/recheck'
```

The supplied checker reads `validation/acceptance`; to check a new run, use that directory as the output or adapt the checker path. Check the entire launch log for runtime and compilation errors; do not rely on GAMA's exit status alone. The PowerShell launcher assumes the installed GAMA path; adjust it on another computer. `build-stage.cjs N` reconstructs stages 2-7 from the reference; it overwrites the appropriate production file, so use it only when intentionally rebuilding a stage.

The earlier AI conversation is unavailable. This package provides a genuine continuation and does not claim to recreate historical prompts or prove that the original specification preceded the first-ever AI prompt.
