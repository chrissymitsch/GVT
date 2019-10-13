var ufowidth = 214;
var ufoheight = 214;
var maxcol = 5;
var maxrow = 6;
var ufomax = 42;
var oben = 0;

function ufostart(counter, col) {
	setTimeout(function(){
		var img = document.getElementById('ufo');
		if(counter < ufomax - 1) {
			if (col > maxcol) {
				col = 0;
				oben++;
			}
			if (oben > maxrow) {
				oben = 0;
				col = 0;
			}
			var newLeft = (-1) * ufowidth * col;
			var newTop = (-1) * ufoheight * oben;
			setBackgroundPosUfo(img, newLeft, newTop);
			
			counter++;
			col++;
			ufostart(counter, col);
		} else {
			setBackgroundPosUfo(img, 0, 0);
			oben = 0;
			ufostart(1, 1);
		}
	}, 100);
}

function setBackgroundPosUfo(img, left1, top1) {
	img.setAttribute('style', 'background-position: '+left1+'px '+top1+'px;');
}

ufostart(0, 0);