model SavannahAI

global {
    // Explicit 100 m world, as required by SPEC.md.
    geometry shape <- square(100 #m);
	int nb_lions <- 20;
	int nb_zebras <- 20;

	init {
		create lion number: nb_lions;
		create zebra number: nb_zebras;
	}
}

// ---------- AGENTS ----------

species lion skills: [moving] parallel: false {
	float speed <- 1.0;

	// random walk
	reflex move {
		do wander;
	}

	// when a lion runs into a zebra, the zebra dies
	reflex kill {
		ask zebra at_distance 2.0 {
			do die;
		}
	}

	aspect base {
		draw circle(3) color: #orange;
	}
}

species zebra skills: [moving] parallel: false {
	float speed <- 1.0;

	// random walk
	reflex move {
		do wander;
	}

	aspect base {
		draw triangle(2) color: #gray;
	}
}

// ---------- CELLS (CA) ----------

grid vegetation_cell width: 50 height: 50 parallel: false {
	// random initial biomass between 0 and 10 kg
	float biomass <- rnd(10.0);

	// linear growth: +0.1 kg per time step
	reflex grow {
		biomass <- biomass + 0.1;
	}

	// visualise grass: more biomass = darker green
	rgb color <- rgb(220, 240, 200) update: rgb(
		int(220 - 180 * min(1.0, biomass / 10.0)),
		int(240 - 100 * min(1.0, biomass / 10.0)),
		int(200 - 180 * min(1.0, biomass / 10.0))
	);
}

// ---------- SIMULATION ----------

experiment savannah_sim type: gui parallel: false {
	output {
        monitor "Lions" value: length(lion);
        monitor "Zebras" value: length(zebra);
        monitor "Grass" value: mean(vegetation_cell collect each.biomass);
        monitor "MinGrass" value: min(vegetation_cell collect each.biomass);
		display main_display axes: false {
			grid vegetation_cell;
			species zebra aspect: base;
			species lion aspect: base;

			graphics "Stats" {
				draw "Lions: " + length(lion) at: {5, 5} color: #black font: font("Arial", 16, #bold);
				draw "Zebras: " + length(zebra) at: {5, 12} color: #black font: font("Arial", 16, #bold);
			}
		}

		display population_chart {
			chart "Population" type: series {
				data "Lions" value: length(lion) color: #orange;
				data "Zebras" value: length(zebra) color: #gray;
			}
		}
        display grass_chart {
            chart "Mean grass biomass (kg per cell)" type: series {
                data "Biomass" value: mean(vegetation_cell collect each.biomass) color: #green;
            }
        }

	}
}
