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
        monitor "LionPosition" value: lion[0].location;
        monitor "ZebraPosition" value: zebra[0].location;
		display main_display {
			species zebra aspect: base;
			species lion aspect: base;
		}
	}
}
