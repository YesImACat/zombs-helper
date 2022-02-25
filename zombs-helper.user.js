// ==UserScript==
// @name         Zombs Helper
// @namespace    https://github.com/cin-ni/zombs-helper
// @version      1.1
// @description  A helper script for zombs.io
// @author       cin-ni
// @match        http://zombs.io/
// @supportURL   https://github.com/cin-ni/zombs-helper
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zombs.io
// @grant        none
// ==/UserScript==
(function () {
	'use strict';
	let carl;
	let woody;
	let time;
	let currentMinion;

	let displayElement;
	let autoPetText;
	let checkbox;

	DisplayInfo();

	setInterval(() => {
		Tick();
	}, 1000);

	function Tick() {
		if (!carl) return Initialize();
		if (!checkbox.checked) return;

		UpdateTime();

		switch (true) {
			case time > 0:
				ChangeMinion(woody, 'Woody');
				break;

			case time < 0:
				ChangeMinion(carl, 'C.A.R.L');
				break;
		}
	}

	function ChangeMinion(element, name) {
		element.click();
		currentMinion = name;
		autoPetText.innerText = `AutoPet: ${name}`;
	}

	function UpdateTime() {
		// the day/night cycle which is a positional integer from 65 to -65 respectively
		time = parseInt(document.querySelector('#hud-day-night-ticker > div.hud-ticker-bar').style.backgroundPosition.slice(0, 3));
	}

	function DisplayInfo() {
		displayElement = document.createElement('div');
		displayElement.innerHTML = '<input type="checkbox" id="autoPetCheckbox" checked><span id="autoPetText">AutoPet: Initializing</span>';
		document.querySelector('#hud > div.hud-bottom-left').appendChild(displayElement);
	}

	function Initialize() {
		try {
			carl = document.querySelector('#hud-menu-shop > div.hud-shop-grid > a:nth-child(8) > span.hud-shop-item-actions > a.hud-shop-actions-equip');
			woody = document.querySelector('#hud-menu-shop > div.hud-shop-grid > a:nth-child(9) > span.hud-shop-item-actions > a.hud-shop-actions-equip');
			checkbox = document.getElementById('autoPetCheckbox');
			autoPetText = document.getElementById('autoPetText');
		} catch (error) {
			return;
		}
	}
})();
