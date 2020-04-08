import {Decimal} from 'Decimal.js';

export default function display(number) {
	
	//catch infinity
	if (number == 'Infinity') { return number; }
	
	//cast to string so we can use string methods
	var x = new String(number);
	
	//remove negative symbol
	if (x[0] == "-") {
		var negative = true;
		x = x.substring(1);
	}
	
	//too small to need commas
	if (x.length < 4 || (x.indexOf(".") > -1 && x.indexOf(".") < 4 && x.length < 12)) { return number; }
	
	//too big... display in exponential form
	if (x.length > 9) {
		return (new Decimal((
			x.indexOf(".") > -1) ? parseFloat(x) : parseInt(x)
		)).toExponential(2, Decimal.ROUND_DOWN);
	}
	
	//if there's a decimal, split the number into pre- and post-deicmal
	if (x.indexOf(".") > -1) {
		var y = x.substring(x.indexOf(".") + 1);
		x = x.substring(0, x.indexOf("."));
	}
	
	//add commas to pre-decimal
	var z = "";
	for (let i = 0; i < x.length; i++) {
		z = x[x.length - i - 1] + z;
		if ((i + 1) % 3 === 0 && i != x.length - 1) { z = "," + z; }
	}
	
	//add post-decimal
	if (y !== undefined) { z += "." + y; }
	
	//add negative symbol
	if (negative !== undefined) { z = "-" + x; }
	
	//return that beautifully formatted number
	return z;
}