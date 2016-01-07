function ConvertToHex(numberValue){
	var decNumber = Number(numberValue);
	var hexNumber = decNumber.toString(16).toUpperCase();
	return hexNumber;
}