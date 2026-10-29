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

species lion skills: [moving] {
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

species zebra skills: [moving] {
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

// ---------- SIMULATION ----------

experiment savannah_sim type: gui {
	output {
        monitor "Lions" value: length(lion);
        monitor "Zebras" value: length(zebra);
		display main_display {
			species zebra aspect: base;
			species lion aspect: base;
		}
	}
}
