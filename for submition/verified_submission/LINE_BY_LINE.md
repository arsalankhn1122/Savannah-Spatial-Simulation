# Complete line-by-line baseline comparison

Every original and baseline line appears once. Matching ignores leading/trailing whitespace only. Added/removed rows expose all changed lines; interpret paired changes using COMPARE.md.

| Unit 1 line | AI baseline line | Status | Content |
|---|---|---|---|
| - | 1 | Added | <code>model SavannahAI</code> |
| 1 | - | Removed | <code>/**</code> |
| 2 | - | Removed | <code> * Name: Savannah</code> |
| 3 | - | Removed | <code> * Description: Coupled ABM + CA model of the African savannah.</code> |
| 4 | - | Removed | <code> *   Agents: 20 lions (orange circles, size 3), 20 zebras (grey triangles, size 2).</code> |
| 5 | - | Removed | <code> *   CA: grass biomass per cell (random 0-10 kg, +0.1 kg per step).</code> |
| 6 | - | Removed | <code> */</code> |
| 7 | - | Removed | <code>model Savannah</code> |
| 8 | 2 | Same | <code>(blank)</code> |
| 9 | 3 | Same | <code>global {</code> |
| - | 4 | Added | <code>    // Explicit 100 m world, as required by SPEC.md.</code> |
| - | 5 | Added | <code>    geometry shape &lt;- square(100 #m);</code> |
| 10 | 6 | Same | <code>	int nb_lions &lt;- 20;</code> |
| 11 | 7 | Same | <code>	int nb_zebras &lt;- 20;</code> |
| 12 | 8 | Same | <code>(blank)</code> |
| 13 | 9 | Same | <code>	init {</code> |
| 14 | 10 | Same | <code>		create lion number: nb_lions;</code> |
| 15 | 11 | Same | <code>		create zebra number: nb_zebras;</code> |
| 16 | 12 | Same | <code>	}</code> |
| 17 | 13 | Same | <code>}</code> |
| 18 | 14 | Same | <code>(blank)</code> |
| 19 | 15 | Same | <code>// ---------- AGENTS ----------</code> |
| 20 | 16 | Same | <code>(blank)</code> |
| - | 17 | Added | <code>species lion skills: [moving] parallel: false {</code> |
| 21 | - | Removed | <code>species lion skills: [moving] {</code> |
| 22 | 18 | Same | <code>	float speed &lt;- 1.0;</code> |
| 23 | 19 | Same | <code>(blank)</code> |
| 24 | 20 | Same | <code>	// random walk</code> |
| 25 | 21 | Same | <code>	reflex move {</code> |
| 26 | 22 | Same | <code>		do wander;</code> |
| 27 | 23 | Same | <code>	}</code> |
| 28 | 24 | Same | <code>(blank)</code> |
| 29 | 25 | Same | <code>	// when a lion runs into a zebra, the zebra dies</code> |
| 30 | 26 | Same | <code>	reflex kill {</code> |
| 31 | 27 | Same | <code>		ask zebra at_distance 2.0 {</code> |
| 32 | 28 | Same | <code>			do die;</code> |
| 33 | 29 | Same | <code>		}</code> |
| 34 | 30 | Same | <code>	}</code> |
| 35 | 31 | Same | <code>(blank)</code> |
| 36 | 32 | Same | <code>	aspect base {</code> |
| 37 | 33 | Same | <code>		draw circle(3) color: #orange;</code> |
| 38 | 34 | Same | <code>	}</code> |
| 39 | 35 | Same | <code>}</code> |
| 40 | 36 | Same | <code>(blank)</code> |
| - | 37 | Added | <code>species zebra skills: [moving] parallel: false {</code> |
| 41 | - | Removed | <code>species zebra skills: [moving] {</code> |
| 42 | 38 | Same | <code>	float speed &lt;- 1.0;</code> |
| 43 | 39 | Same | <code>(blank)</code> |
| 44 | 40 | Same | <code>	// random walk</code> |
| 45 | 41 | Same | <code>	reflex move {</code> |
| 46 | 42 | Same | <code>		do wander;</code> |
| 47 | 43 | Same | <code>	}</code> |
| 48 | 44 | Same | <code>(blank)</code> |
| 49 | 45 | Same | <code>	aspect base {</code> |
| 50 | 46 | Same | <code>		draw triangle(2) color: #gray;</code> |
| 51 | 47 | Same | <code>	}</code> |
| 52 | 48 | Same | <code>}</code> |
| 53 | 49 | Same | <code>(blank)</code> |
| 54 | 50 | Same | <code>// ---------- CELLS (CA) ----------</code> |
| 55 | 51 | Same | <code>(blank)</code> |
| - | 52 | Added | <code>grid vegetation_cell width: 50 height: 50 parallel: false {</code> |
| 56 | - | Removed | <code>grid vegetation_cell width: 50 height: 50 {</code> |
| 57 | 53 | Same | <code>	// random initial biomass between 0 and 10 kg</code> |
| 58 | 54 | Same | <code>	float biomass &lt;- rnd(10.0);</code> |
| 59 | 55 | Same | <code>(blank)</code> |
| 60 | 56 | Same | <code>	// linear growth: +0.1 kg per time step</code> |
| 61 | 57 | Same | <code>	reflex grow {</code> |
| 62 | 58 | Same | <code>		biomass &lt;- biomass + 0.1;</code> |
| 63 | 59 | Same | <code>	}</code> |
| 64 | 60 | Same | <code>(blank)</code> |
| 65 | 61 | Same | <code>	// visualise grass: more biomass = darker green</code> |
| 66 | 62 | Same | <code>	rgb color &lt;- rgb(220, 240, 200) update: rgb(</code> |
| 67 | 63 | Same | <code>		int(220 - 180 * min(1.0, biomass / 10.0)),</code> |
| 68 | 64 | Same | <code>		int(240 - 100 * min(1.0, biomass / 10.0)),</code> |
| 69 | 65 | Same | <code>		int(200 - 180 * min(1.0, biomass / 10.0))</code> |
| 70 | 66 | Same | <code>	);</code> |
| 71 | 67 | Same | <code>}</code> |
| 72 | 68 | Same | <code>(blank)</code> |
| 73 | 69 | Same | <code>// ---------- SIMULATION ----------</code> |
| 74 | 70 | Same | <code>(blank)</code> |
| - | 71 | Added | <code>experiment savannah_sim type: gui parallel: false {</code> |
| 75 | - | Removed | <code>experiment savannah_sim type: gui {</code> |
| 76 | 72 | Same | <code>	output {</code> |
| - | 73 | Added | <code>        monitor "Lions" value: length(lion);</code> |
| - | 74 | Added | <code>        monitor "Zebras" value: length(zebra);</code> |
| - | 75 | Added | <code>        monitor "Grass" value: mean(vegetation_cell collect each.biomass);</code> |
| - | 76 | Added | <code>        monitor "MinGrass" value: min(vegetation_cell collect each.biomass);</code> |
| - | 77 | Added | <code>		display main_display axes: false {</code> |
| 77 | - | Removed | <code>		display main_display {</code> |
| 78 | 78 | Same | <code>			grid vegetation_cell;</code> |
| 79 | 79 | Same | <code>			species zebra aspect: base;</code> |
| 80 | 80 | Same | <code>			species lion aspect: base;</code> |
| 81 | 81 | Same | <code>(blank)</code> |
| 82 | 82 | Same | <code>			graphics "Stats" {</code> |
| 83 | 83 | Same | <code>				draw "Lions: " + length(lion) at: {5, 5} color: #black font: font("Arial", 16, #bold);</code> |
| 84 | 84 | Same | <code>				draw "Zebras: " + length(zebra) at: {5, 12} color: #black font: font("Arial", 16, #bold);</code> |
| 85 | 85 | Same | <code>			}</code> |
| 86 | 86 | Same | <code>		}</code> |
| 87 | 87 | Same | <code>(blank)</code> |
| 88 | 88 | Same | <code>		display population_chart {</code> |
| 89 | 89 | Same | <code>			chart "Population" type: series {</code> |
| 90 | 90 | Same | <code>				data "Lions" value: length(lion) color: #orange;</code> |
| 91 | 91 | Same | <code>				data "Zebras" value: length(zebra) color: #gray;</code> |
| 92 | 92 | Same | <code>			}</code> |
| 93 | 93 | Same | <code>		}</code> |
| - | 94 | Added | <code>        display grass_chart {</code> |
| - | 95 | Added | <code>            chart "Mean grass biomass (kg per cell)" type: series {</code> |
| - | 96 | Added | <code>                data "Biomass" value: mean(vegetation_cell collect each.biomass) color: #green;</code> |
| 94 | 97 | Same | <code>	}</code> |
| 95 | 98 | Same | <code>}</code> |
| 96 | 99 | Same | <code>(blank)</code> |
| - | 100 | Added | <code>	}</code> |
| - | 101 | Added | <code>}</code> |
| - | 102 | Added | <code>(blank)</code> |

Source SHA-256: eed890022ab7aac3cf61255a0c287f31b0b990212611e0ee386bd55f128d5929
