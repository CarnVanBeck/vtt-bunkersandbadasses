import { BADASS } from "./config.mjs";
import { getSystemDefenses, getSystemElements, getSystemGunTypes, getSystemManufacturers } from "./systemValues.mjs";

export function simulateGetSaveFile() {
	let htmlA = document.createElement("a");
	let url = URL.createObjectURL(getSettingsSaveFile());
	htmlA.href = url;
	htmlA.download = "settings.json";
	document.body.appendChild(htmlA);
	htmlA.click();
	setTimeout(function() {
		document.body.removeChild(htmlA);
		window.URL.revokeObjectURL(url);
	}, 0);
}

export function getSettingsSaveFile() {
	// key has to be the same as in game.settings or the re-import will fail
	let systemDataSets = {
		"gunTypes" : getSystemGunTypes(),
		"elements" : getSystemElements(),
	 	"defenses" : getSystemDefenses(),
		"manufacturers" : getSystemManufacturers()
	}
	let stringified = JSON.stringify(systemDataSets, undefined, 4); 
	return new File([stringified], "settings.json", {type: "application/json",});
}

export function simulateLoadSaveFile() {
	let htmlInput = document.createElement("input");
	htmlInput.type = "file";
	htmlInput.onchange = (event) => {
		if (event == undefined) {
			return;
		}
		let saveFile = event.target.files[0];
		loadSaveFile(saveFile);
		};
	document.body.appendChild(htmlInput);
}

/**
 * 
 */
export function loadSaveFile(saveFile) {
	let reader = new FileReader();
	reader.onload = ((file) => {
        let readData = JSON.parse(file.target.result);
		for(let [key, data] of Object.entries(readData)) {
			game.settings.set(BADASS.namespace, key, data);
		}
    });
	reader.readAsText(saveFile, 'utf8');
}