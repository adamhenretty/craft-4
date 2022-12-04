import Toggle from './_toggle.js';
import * as bodyScrollLock from './_bodyScrollLock.js';

const SITE = {

	// --------------------------------------------
	// CACHE SOME COMMON PROPERTIES
	// --------------------------------------------

	getSettings: function(){
		//this.$html = $('html');
	},

	// --------------------------------------------
	// GET THIS PARTY STARTED...
	// --------------------------------------------

	init: function(){
		SITE.getSettings();
		SITE.bindUI();
		SITE.refreshCSRFs();
		SITE.getEditLink();
	},

	// --------------------------------------------
	// refreshCSRFs to evade any static caching
	// --------------------------------------------

	refreshCSRFs: function() {
		fetch('/getCSRF', {
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
			},
			method: 'GET'
		})
			.then(response => response.text())
			.then(data => {
				document.querySelectorAll('[name="CRAFT_CSRF_TOKEN"]').forEach(item => {
					item.value = data;
				});
				// also store in window so it can be reused by other scripts
				window.csrfTokenValue = data;
			});
	},

	// --------------------------------------------
	// GET EDIT LINK via ajax just in case we're using static cache
	// --------------------------------------------

	getEditLink: function(){
		const editMarker = document.querySelector('.js-edit-this');
		const data = {
			"thing": editMarker.dataset.thing,
			"CRAFT_CSRF_TOKEN": window.csrfTokenValue
		};

		fetch('/getEditLink', {
			headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(data)
		})
			.then(response => response.text())
			.then(xhrResponse => {
				if (xhrResponse && xhrResponse.trim()) {
					editMarker.innerHTML = xhrResponse;
					setTimeout(function () {
						document.querySelector('.edit-this').classList.remove('posing');
					}, 600);
				}
			});
	},

	// --------------------------------------------
	// UI EVENT BINDINGS
	// --------------------------------------------

	bindUI: function(){

		// --------------------------------------------
		// TOGGLEABLES
		// --------------------------------------------

		new Toggle('.js-toggle');

		// --------------------------------------------
		// PREVENT BACKGROUND SCROLLING esp on iOS while
		// various overlays are on.
		// Uses this lib: https://github.com/willmcpo/body-scroll-lock
		// --------------------------------------------

		// toggle method allows a single element to do both on and off functions...
		document.querySelectorAll('.js-toggleScrollLock').forEach(el => {
			el.addEventListener('click', e => {
				if (e.currentTarget.getAttribute('aria-expanded') === 'true' || e.currentTarget.dataset.close){
					let target = document.getElementById(e.currentTarget.dataset.activeTargetId);
					bodyScrollLock.disableBodyScroll(target, {reserveScrollBarGap: true});
				} else {
					bodyScrollLock.clearAllBodyScrollLocks();
				}
			});
		});

		// --------------------------------------------
		// WRAP TABLES
		// --------------------------------------------

		Array.from(document.getElementsByTagName('table')).forEach(el => {
			const wrapper = document.createElement('div');
			wrapper.style.overflowX = 'auto';
			wrapper.className = 'spacing';
			el.parentNode.insertBefore(wrapper, el);
			wrapper.appendChild(el);
		});

		// --------------------------------------------
		// Allow role=button to behave like a real <button> el.
		// by triggering the click on spacebar/enter keydown
		// --------------------------------------------

		document.querySelectorAll('div[role="button"]').forEach(el => {
			el.addEventListener('keydown', e => {
				const keyDown = e.key !== undefined ? e.key : e.keyCode;
				if ( (keyDown === 'Enter' || keyDown === 13) || (['Spacebar', ' '].indexOf(keyDown) >= 0 || keyDown === 32)) {
					// Default behavior is prevented to prevent the page to scroll when "space" is pressed
					e.preventDefault();
					el.click();
				}
			});
		});
	},
};

SITE.init();