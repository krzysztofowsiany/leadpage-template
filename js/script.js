/*HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
HH				Overlay
HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH*/
(function () {
	var triggerBttn = document.getElementById('trigger-overlay'),
		overlay = document.querySelector('div.overlay'),
		closeBttn = overlay.querySelector('button.overlay-close');
	transEndEventNames = {
		'WebkitTransition': 'webkitTransitionEnd',
		'MozTransition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'msTransition': 'MSTransitionEnd',
		'transition': 'transitionend'
	}
	transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
		support = { transitions: Modernizr.csstransitions };

	function toggleOverlay() {
		if (classie.has(overlay, 'open')) {
			classie.remove(overlay, 'open');
			classie.add(overlay, 'close');
			var onEndTransitionFn = function (ev) {
				if (support.transitions) {
					if (ev.propertyName !== 'visibility') return;
					this.removeEventListener(transEndEventName, onEndTransitionFn);
				}
				classie.remove(overlay, 'close');
			};
			if (support.transitions) {
				overlay.addEventListener(transEndEventName, onEndTransitionFn);
			}
			else {
				onEndTransitionFn();
			}
		}
		else if (!classie.has(overlay, 'close')) {
			classie.add(overlay, 'open');
		}
	}

	$(".overlay ul li a").click(function () {
		toggleOverlay();
	});


	triggerBttn.addEventListener('click', toggleOverlay);
	closeBttn.addEventListener('click', toggleOverlay);
})();


$(document).ready(function () {
	$("#client-speech").owlCarousel({
		autoPlay: 3000,
		navigation: false, // Show next and prev buttons
		slideSpeed: 700,
		paginationSpeed: 1000,
		singleItem: true
	});
});



function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function validate() {
	var email = $("#email");
	var result = $("#result");
	result.hide();

	if (validateEmail(email.val())) {

		var sendingData = {
			email_address: email.val()
		}
		$.ajax({
			url: 'https://gemustudio.us15.list-manage.com/subscribe/post?u=3be80412cad8b939995932c2a&id=9261314134',
			method: 'POST',
			type: 'json',
			crossDomain: true,
			xhrFields: { withCredentials: true }, 
			contentType: 'application/x-www-form-urlencoded', 
			data: sendingData,
			success: function (response) {
				console.log(response);
			},
			error: function (error) {
				console.log(error);
			}
		});
		//post
		/*{
			"email_address": "urist.mcvankab@freddiesjokes.com",
				"status": "subscribed",
					"merge_fields": {
				"FNAME": "Urist",
					"LNAME": "McVankab"
			}
		}*/
		//https://gemustudio.us15.list-manage.com/subscribe/post?u=3be80412cad8b939995932c2a&amp;id=9261314134
	} else {

		result.show();
		//html("Proszę podać poprawny email.");
		email.css("border-color", "red");
		email.css("background-color", "LightPink");
	}
	return false;
}


