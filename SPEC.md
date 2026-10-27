# Specification: African Savannah (Unit 1)

## 1 Purpose
A coupled agent based and cellular automaton model of an African savannah in GAMA (GAML).
Question: What happens to the zebras when the lions just wander around and kill the zebras they come across?

## 2 World
- Continuous 2D world (100m x 100m)
- One simulation step = one time step.

## 3 Entities
| Entity | Count | Look |
|---|---|---|
| lion (agent) | 20 | orange circle, size 3 |
| zebra (agent) | 20 | grey triangle, size 2 |
| vegetation_cell (grid, CA) | 50 x 50 = 2,500 cells | green; darker = more grass |

Lions and zebras are initially at random positions.

## 4 Behaviour
1. Movement: every lion and every zebra walks at random each step (speed 1).
2. Killing: a lion running into a zebra kills it (built-in action `die`).
   Assumption: "runs into" means the zebra is within 2m of the lion.
3. Grass: each cell has a biomass in kg. Initially it's a random value between 0 and 10 kg.
   Each step it increases by 0.1kg (linear growth, no upper limit).

## 5 Output
- A map showing the grass grid, the zebras and the lions.
- Counters for lions and zebras, a chart of both populations over time,
  and a chart of the mean grass biomass per cell over time.

## 6 Build order and acceptance tests (one feature at a time)
| # | Feature | Test |
|---|---|---|
| F1 | Agents | 20 orange circles and 20 grey triangles appear at random places |
| F2 | Random walk | every agent moves each step and none leaves the world |
| F3 | Kill | the zebra count only goes down; a zebra within 2 m of a lion disappears |
| F4 | Grass | random patchy green at the start; mean biomass starts near 5 kg and rises 0.1 kg per step |
| F5 | Charts | the counters and both charts update every step |

## 7 Out of scope
Energy, eating, reproduction, a grass limit (these come in step 4, Extend).
