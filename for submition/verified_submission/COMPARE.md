# Comparison with the handwritten Unit 1 model

Source: `../../../assignement1/savannah (1).gaml`; an unchanged copy is supplied in `reference/savannah_unit1.gaml`. Compare the Unit 1 source with `savannah_baseline.gaml` first, then inspect the deliberate additions in `savannah_extended.gaml`. `LINE_BY_LINE.md` accounts for every source and baseline line, including additions and deletions. `baseline-to-extended.diff` records every extension change.

| Element | Handwritten Unit 1 | Final AI baseline | Assessment |
|---|---|---|---|
| Header and name | Descriptive file header; Savannah | SavannahAI; original section comments retained | Naming has no ecological effect. The original header explains intent better; this specification supplies that context. |
| World | No explicit shape declaration | `square(100 #m)` | Makes the specified extent explicit, independent of an implicit platform default. It is incorrect to claim the source explicitly had this declaration. |
| Initial agents | 20 lions and 20 zebras; platform default placement | Same | No custom positioning in production models. |
| Movement | Both species use `moving`, speed 1, `do wander` | Same | Preserves the original random-walk mechanism. A movement action can be obstructed by the boundary; the model does not guarantee displacement every step. |
| Predation | `ask zebra at_distance 2.0 { do die; }` | Identical | All nearby zebras die, not only one randomly selected zebra. Agent positions define proximity; drawn symbol radii are not collision rules. |
| Grid | 50 x 50; random 0-10 kg; +0.1 per step | Identical | Independent cell updates. Neither implementation uses neighbour states. Calling this a spreading vegetation CA would overstate its semantics. |
| Grass colour | Green RGB channels saturate at 10 kg | Identical | Correctly darkens with biomass up to 10 kg, then loses visual contrast. Colour saturation does not cap stored biomass. |
| Agent appearance | Orange circle radius 3; grey triangle size 2 | Same | Original appearance retained. |
| Map and counters | Map, two text counters | Same; `axes: false` | Hides axes where supported; a presentation choice, not ecological improvement. |
| Population chart | Present | Present | Same population series. |
| Mean grass chart | Absent | Added | Fulfils the existing specification. The earlier COMPARE.md incorrectly said both versions already had this chart. |
| Numeric monitors | Absent | Added for headless verification | Exposes actual state without changing species dynamics. |

## Semantic errors found in the pre-existing extension

The two pre-existing `savannah_ai.gaml` copies were identical on inspection. They added feeding and energy but also silently changed the model: `min(10.0, biomass + 0.1)` introduced a carrying-capacity assumption, while `one_of(prey)` changed an all-prey kill into a one-prey kill. Both are reasonable alternative models only if specified. The final extension restores unbounded grass and all-prey predation, with 10 energy units credited per killed zebra. The old files are preserved for provenance.

The earlier comparison also called the world declaration and grass chart identical despite their absence from the actual handwritten file. This comparison corrects those claims.

## Deliberate extension choices

1. After wandering, zebras locate a cell whose shape covers their position. They remove `min(1.0, patch.biomass)` kg. This prevents negative biomass and identifies a containing cell rather than merely a nearby centre. Exact shared-boundary positions may be covered by two cells; `first_with` chooses one. The implementation searches up to 2,500 cells per zebra, favouring clarity over speed.
2. A lion starts at 50 energy units. Each wander action costs 0.05, irrespective of realised distance; this models movement effort per step, not a distance-calibrated metabolic rate. Hunting gives 10 per victim; starvation is checked afterwards. A lion can therefore recover from a nonpositive post-movement value by feeding in the same step.
3. Starvation is an explicit added assumption. Zebras do not gain energy, starve or reproduce. Neither species reproduces. Extinction and rising grass are possible; a stable ecosystem is not an expected validation target.
4. The models retain GAMA's population scheduler rather than declaring a custom cross-species order. In the controlled co-located-prey run, zebras grazed before being killed; do not infer a lion-first order from the source declaration order. The isolated grazing test shows regrowth after grazing. Within a lion, movement, hunting and starvation are explicitly ordered by their reflex declarations.

Parallel execution is explicitly disabled on each population and the experiment to avoid an intermittent headless scheduling exception found during testing. This follows the documented `parallel` facet: [GAMA statements reference](https://gama-platform.org/wiki/Statements). The final acceptance run contains no Java runtime errors. Scheduling is a material modeling choice: [GAMA runtime concepts](https://gama-platform.org/wiki/next/RuntimeConcepts).

These checks establish agreement with stated rules, not realism of the parameters or ecological predictions. The original handwritten source and old submission files have not been overwritten.
