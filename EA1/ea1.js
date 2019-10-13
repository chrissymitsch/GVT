var width = 257;
var max = 25;

function start(counter) {
	setTimeout(function(){
		var img = document.getElementById('scheibenwelt2');
		if(counter < max - 1) {
			var newLeft = (-1) * width * counter;
			
			setBackgroundPos(img, newLeft);
			
			counter++;
			start(counter);
		} else {
			setBackgroundPos(img, 0);
			start(1);
		}
	}, 100);
}

var left1 = 0;

window.onkeydown = function(evt) {
	var key = evt.which ? evt.which : evt.keyCode;
	var c = String.fromCharCode(key);
	var img = document.getElementById('scheibenwelt1');
	var maxright = (-1) * (max - 2) * width;
	switch (c) {
        case ('R'):
			left1 = left1 - width;
			if (left1 < maxright) {
				left1 = 0;
			}
            setBackgroundPos(img, left1);
            break;
        case ('L'):
			left1 = left1 + width;
			if (left1 > 0) {
				left1 = maxright;
			}
            setBackgroundPos(img, left1);
            break;
	}
};

function setBackgroundPos(img, left) {
	img.setAttribute('style', 'background-position: '+left+'px 0px;');
}

start(0);