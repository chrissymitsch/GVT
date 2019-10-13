var ufowidth = 214;
var ufoheight = 214;
var maxcol = 5;
var maxrow = 6;
var ufomax = 42;
var reihe = 0;
var spalte = 0;

function ufostart(counter) {
	setTimeout(function(){
		var img = document.getElementById('ufo');
		if(counter < ufomax - 1) {
			if (spalte > maxcol) {
				spalte = 0;
				reihe++;
			}
			if (reihe > maxrow) {
				spalte = 0;
				reihe = 0;
			}
			var newLeft = (-1) * ufowidth * spalte;
			var newTop = (-1) * ufoheight * reihe;
			setBackgroundPosUfo(img, newLeft, newTop);
			
			counter++;
			spalte++;
			ufostart(counter);
		} else {
			setBackgroundPosUfo(img, 0, 0);
			reihe = 0;
			spalte = 1
			ufostart(1);
		}
	}, 100);
}

function setBackgroundPosUfo(img, left1, top1) {
	img.setAttribute('style', 'background-position: '+left1+'px '+top1+'px;');
}

ufostart(0);