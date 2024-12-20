export const preloadHandlebarsTemplates = async function () {
	// Define template paths to load
	const templatePaths = {
		// Gun parts
		gunCardHitLine: "systems/vtt-bunkersandbadasses/templates/parts/gunCardAccuracyLine.html",
		optionSelector: "systems/vtt-bunkersandbadasses/templates/parts/optionSelector.html",
	
		// Dices
		d4: "systems/vtt-bunkersandbadasses/assets/styleable/dice/d4.html",
		d6: "systems/vtt-bunkersandbadasses/assets/styleable/dice/d6.html",
		d20: "systems/vtt-bunkersandbadasses/assets/styleable/dice/d20.html",

		// elements
		elementAcid: "systems/vtt-bunkersandbadasses/assets/styleable/elements/acid.html",
		elementCryo: "systems/vtt-bunkersandbadasses/assets/styleable/elements/cryo.html",
	};

	// Load the template parts
	return loadTemplates(templatePaths);
};