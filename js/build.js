
/*********************************************************
 * 
 * INIT
 * 
 * 
 *********************************************************/

function init(){
	
	var refToClicked = 0;
	
	var startingIP = [];
	var cidr = [24,25,26,27,28,29,30,31,32];

	//i want to keep a reference to the ip address. it is random for the last two numbers
	startIP1 = 192;
	startIP2 = 168;
	secondIpNum = randomIntFromInterval(1,255);
        //ARRAY USED TO STORE ALL THE BROADCAST ID'S
        broadcastIdArr = [];
        //ARRAY USER TO STORE ALL THE NETWORK ID'S
        networkIdArr = [];
	var addCDIR = cidr[3];
	//there needs to be enough available subnet ips to fit 5 users
	//var addCDIR = cidr[randomIntFromInterval(3,5)];
	var currSubnet = '';//ref to the subnet we just added an ip address to!
	var currEntry = '';//ref the id of the ip addy box I just clicked
	var rowRef = ['a','b','c','d'];//there are only for subnets available. once you set an ip address in a subnet a refreence to that subnet row is inserted to this array - the reference number is to which row in the array of possible ranges
	var row1 = null;
	var row2 = null;
	var row3 = null;
	var row4 = null;
	
	var allPossibleIP = [];
	
	//random ip address to start with - will refresh
	var subnettingIP_ref = startIP1 +'.'+ startIP2 +'.'+ secondIpNum +'.'+randomIntFromInterval(1,255)+'/'+ addCDIR;
	//place the starting ip
	$("#staticIP").text(subnettingIP_ref);
	
	//getting the range to test against
	var theTestRange = getHostID($("#staticIP").text());
        for(var t=0;t<theTestRange.length;t++){
                    //console.log(theTestRange[t][0]);
                    //console.log(theTestRange[t][1]);
                    broadcastIdArr.push(theTestRange[t][0]);
                    networkIdArr.push(theTestRange[t][1]);
        }
	//console.log(theTestRange);

	
	//$(".start").show().siblings().hide()
	
	
	
	$("#entryBox").draggable();
	$("#entryBox").hide();
        
        
        $("#directions_btn").click(function() {
            window.open('pdf/Ebook_Preview_WIP.pdf','instructions');
            
        });
        
        $(".eb_input").keyup(function() {
          //  console.log($(this).val().length);
           //As soon as the characters have been entered, move to the next box
           
            //AS SOON AS THREE CHARACTERS ARE ENTERED, MOVE ON TO THE NEXT BOX
           if ($(this).val().length >= 3) {
              var nextIntStr = $(this).attr("id").toString().substring(2,3); 
              var nextInt = parseInt(nextIntStr) + 1;
              var nextId = "#ip"+nextInt.toString();
               $(nextId).focus();
              
               //$(this).next().focus();
           }
        }
 );

/****************
 * EVENT HANDLERS
 ****************/

//THIS CLICK FUNCTION CONTROLS THE INPUT BOX YOU INITIALLY CLICK TO OPEN UP THE FORM WHERE THE IP ADDRESS IS SUBMITTED

$(".ipAdd").click(function(){
          
		var thisID = $(this).attr('id');
		var thisIP = $(this).text();
		var thisSubnet = $(this).parent().attr('id');
		currSubnet = thisSubnet;
		currEntry = thisID;
		refToClicked = thisID;
		
		$("#entryBox").show();
                $("#ip0").focus();


		changeIP(thisIP);
 });
	
        
$(document).keydown(function(e) {
           //IF ONE OF THE INPUT BOXES HAS FOCUS WHEN ENTER IS PRESSEDD THEN RUN THE SAME CODE AS THE SUBMTI BUTTON.
                    if (e.keyCode == 13) {
                        //console.log($(document.activeElement).parents("#entryBox"));                        
                        if ($(document.activeElement).hasClass('eb_input')) {
                            submitData();
                        }
                        
                    }
           
           //IF THE USER PRESSES THE ESCAPE BUTTON WHEN THE INPUT BOX HAS FOCUS THEN CLOSE THE DARN BOX
                    if (e.keyCode == 27) {
                        //console.log($(document.activeElement).parents("#entryBox"));                        
                        if ($(document.activeElement).hasClass('eb_input')) {
                            $("#entryBox").hide();
                        }
                        
                    }
           //
        
 });
	
//THIS IS THE 'SUBMIT' BUTTON
$("#eb_btn_close").click(function(){
              //  submitData();
                  submitData();
});
        
/**************************************
DATA VALIDATION
***************************************/     


function submitData() {
                var isValid = true;
                var isDuplicate = false;
                //console.log('submitData ran');
		var newIP = '';
		//console.log('currSubnet: '+currSubnet);
                //BUILD THE NEW IP BY GRABBING THE VALUES WITHIN THE INPUT BOXES AND CONCATENATING ALL OF WITH A PERIOD BETWEEN ALL OF THEM
		for(var i = 0;i<4;i++){
                        //LET'S GO AHEAD AND ASSURE THAT THAT ALL FOUR OCTETS CONTAIN NUMBERS THAT ARE BETWEEN 0 AND 255
                        
                        if (validateOctet("ip"+i, refToClicked) == false) {
                            isValid = false;
                        }
			newIP += $("#ip"+i).val();
			if(i<3){
				newIP += ".";
			}
		}
		
	
		//check against used ip address - we can only use it once
		
	//	console.log("currEntry - " + currEntry);
	//	console.log("refToClicked - " + refToClicked);
		//ASSIGN THE NEWLY CREATED IP ADDRESS TO ITS NEW HOME
		$("#"+refToClicked).html(newIP);
                
                if (checkForBroadcastID(newIP, currEntry) == false) {
                                        isValid = false;
                }
                
                if (checkForNetworkID(newIP, currEntry) == false) {
                                        isValid = false;
                }
                
                if (checkOctets(currEntry) == false) {
                        isValid = false;
                }
                
                if (checkRange(currEntry) == false) {
                    isValid = false;
                }
                
                checkForDuplicates();
                
                if (!isValid) {
                    showError(currEntry);
                }
                        
                else {
                    clearError(currEntry);
                    checkAllFields();
                }
                
		$("#entryBox").hide();
		
                //I ASSUME THIS CODE IS PERMANENTLY DEPRECATED SINCE THE CODE DIRECTLY PRECEDING IT WILL ALWAYS CAUSE THE CONDITIONAL STATEMENT TO NOT TRIGGER --CHW
		//if($("#"+refToClicked).html() != ""){
		//	$("#"+refToClicked).siblings().show()
		///}
		//get the top level ip addresses
                //I GUESS THIS IS HERE BECAUSE I WANT TO TRACK WHICH IP'S HAVE BEEN FILLED OUT AND WHICH HAVEN'T.
		refToClicked = refToClicked.replace("pc", "");
		refToClicked = refToClicked.replace("_ip", "");


                        //ABSOLUTELY NO CLUE
                /*        
			switch(Number(refToClicked)){
				case 13:
                  //                  console.log('case 13 validated as true');
					startingIP[0] = newIP;
				break;
				case 14:
					startingIP[1] = newIP;
				break;
				case 15:
					startingIP[2] = newIP;
				break;
				case 16:
					startingIP[3] = newIP;
				break;
			}
*/
}

function checkRange(e) {
//    console.log('checkRange ran');
    var validRange = true;
    var par = $("#"+e).parent().attr('id');
    par = par.replace("subnet", "");
    var selectedRange;
    
//    console.log('par - ' + par);
//    console.log('rowRef[par] ' + rowRef[par]);
    for(var t=0;t<theTestRange.length;t++){
        if($("#ip3").val()>= theTestRange[t][0] && $("#ip3").val() <= theTestRange[t][1]){
//            console.log('row reference - ' + t);
            
            selectedRange = t;
        }
    }
    
    for (var i = 0; i < rowRef.length; i++) {
        if (i != par) {
//            console.log('rowRef[i] - ' + rowRef[i]);
//            console.log('selectedRange - ' + selectedRange);
            if (rowRef[i] == selectedRange) {
                validRange = false;
            }
        }
    }
    
    if (validRange == true) {
        rowRef[par] = selectedRange;
    }
    
    return validRange;
}

//CHECK ALL FIELDS TO SEE IF THEY'VE ALL BEEN FILLED OUT WITH VALID IP ADDRESSES. 
//IF ALL FIELDS HAVE BEEN FILLED OUT PROPERLY THEN TURN THEM ALL GREEN SO THAT THE USER
//KNOWS THAT THEY ARE DONE. --CHW
function checkAllFields() {
    //CONSIDER IT COMPLETE UNTIL PROVEN INCOMPLETE IN A RATIONAL CONDITIONAL STATEMENT
    var complete = true;
   //WE WILL TEST ALL DIVS THAT END IN _IP. IF THEY ARE ALL FILLED OUT WITH A VALID VALUE THEN WE'LL TURN ALL BOXES GREEN.
   $('div[id$=_ip]').each(function() {
           if ($(this).text() == "" || $(this).hasClass('yellowText') == true || $(this).hasClass('redText') == true) {
                //console.log('SO FALSE!@$');
                complete = false;
            } 
        }     
   );

        if (complete) {
            $('div[id$=_ip]').each(function() {
                  $(this).addClass('greenText');
            });
        }

}
 

function validateOctet(e) {
            var validIP = true;
            //check to see if the value passed in is between 0 and 255
            //console.log($("#"+e));
            //console.log('validateOctet runs and the value for currEntry is -' + currEntry);
            if ($("#"+e).val() < 0 || $("#"+e).val() > 255) {
                validIP = false;
            }
    return validIP;
                  
}
  
function checkForDuplicates() {

    $('div[id$=_ip]').each(function() {
        var duplicateIP = false;
        var thisIPbox = this;
        $('div[id$=_ip]').each(function() {
            if ($(this).text() == $(thisIPbox).text() && $(this).attr('id') != $(thisIPbox).attr('id') && $(this).text() != '') {
                duplicateIP = true;
            }
        });
        
        if (duplicateIP == true && $(this).hasClass('yellowText') == false) {
            $(this).addClass('yellowText');
            if ($(thisIPbox).hasClass('yellowText') == false) {
                $(thisIPbox).addClass('yellowText');
            }
        }
        
        else if (duplicateIP == false) {
            $(this).removeClass('yellowText');
        }
        
        
    });
    
}

//ORIGINAL VERSION

//TEST THE FOURTH OCTET TO SEE IF THIS IP POSSIBLY REPRESENTS A BROADCAST ID
function checkForBroadcastID(ip, selectedEntryBox) {
    var validIP = true;
    //get the fourth octet of the ip. The ip is a string, each octet is "delimited" by a period at the end except for the last one
    
    //GRAB THE CHARACTER POSITION OF THE FIRST PERIOD 
        var charPos1 = ip.indexOf(".");
        var charPos2 = ip.indexOf(".", ip.indexOf(".")+1);
        //GRAB THE CHARACTER POSITION OF THE THIRD PERIOD.
        var charPos3 = ip.indexOf(".", (charPos2+1));
        //DEFINE THE 4TH OCTET
        var octet4 = ip.substring(charPos3+1, ip.length);
        //IF THE FOURTH OCTET DOES MATCH AN ID THEN MARK IT RED
    for (var i = 0; i < broadcastIdArr.length; i++) {
        if (broadcastIdArr[i] == octet4) {
            validIP = false;  
        }
        
        
    }
    return validIP;
}

//TEST THE FOURTH OCTET TO SEE IF THIS IP POSSIBLY REPRESENTS A NETWORK ID
function checkForNetworkID(ip, selectedEntryBox) {
    var validIP = true;
    //get the fourth octet of the ip. The ip is a string, each octet is "delimited" by a period at the end except for the last one
        var charPos1 = ip.indexOf(".");
       // console.log(charPos1);
        
        //GRAB THE CHARACTER POSITION OF THE SECOND PERIOD.
        var charPos2 = ip.indexOf(".", ip.indexOf(".")+1);
        //console.log('charPos2 - ' + charPos2);
        
        //GRAB THE CHARACTER POSITION OF THE THIRD PERIOD.
        var charPos3 = ip.indexOf(".", (charPos2+1));
       // console.log('charPos3 - ' + charPos3);
       
        //DEFINE THE 4TH OCTET
        var octet4 = ip.substring(charPos3+1, ip.length);
    
        //IF THE FOURTH OCTET DOES MATCH AN ID THEN MARK IT RED
    for (var i = 0; i < networkIdArr.length; i++) {
        if (networkIdArr[i] == octet4) {
            validIP = false;  
        }
        
        
    }
    
    return validIP;
}
    
//RAN WHENEVER A NEW IP ADDRESS IS SUBMITTED. THIS WILL CHECK AND MAKE SURE THAT THE 1ST, 2ND, AND 3RD OCTETS
//HAVE VALID VALUES PLACED IN THEM.
function checkOctets(obj) {
    var validIP = true;
//    console.log('checkOctets ran');
            //THE TEXT OF THE REFERENCED OBJECT WILL ALWAYS BE AN IPv4 ADDRESS.
        //GRAB THE VALUE OF EACH OCTET SO EACH ONE CAN BE TESTED.
        //GRAB THE CHARACTER POSITION OF THE FIRST PERIOD. 
        
        var theParent = $("#"+obj ).parent().attr('id');
	var refText = $("#"+obj ).text();
	var theObj = $("#"+obj );
        
        var charPos1 = refText.indexOf(".");    
        //GRAB THE CHARACTER POSITION OF THE SECOND PERIOD.
        var charPos2 = refText.indexOf(".", refText.indexOf(".")+1);
        //GRAB THE CHARACTER POSITION OF THE THIRD PERIOD.
        var charPos3 = refText.indexOf(".", (charPos2+1));
        //DEFINE THE 1ST OCTET
        var octet1 = refText.substring(0, charPos1);
        //DEFINE THE 2ND OCTET
        var octet2 = refText.substring(charPos1+1, charPos2);
        //DEFINE THE 3RD OCTET
         var octet3 = refText.substring(charPos2+1, charPos3);
        //DEFINE THE 4TH OCTET
        var octet4 = refText.substring(charPos3+1, refText.length);
        //CHECK TO SEE IF THE FIRST THREE OCTETS ARE FILLED OUT CORRECTLY.
        //CURRENTLY THE CORRECT VALUE OF THE 1ST OCTET IS HARDCODED INTO THE VARIABLE startIP1 IN THE init() FUNCTION.
        if (octet1 != startIP1 || octet2 != startIP2 || octet3 != secondIpNum) {
                validIP = false;
        }
    return validIP;    
}



/*******************************************
 * 
 * HELPER FUNCTIONS
 * 
 *******************************************/

	//break ip into array to place in the pop up
	function changeIP(a){
		var res = a.split(".");
		for(var i = 0; i<res.length-1; i++){
			$("#ip"+i).val(res[i]);
		}
	}
}

function showError(e){
      //  console.log('showError ran')
      //  console.log(e);
      if ($("#"+e).hasClass('redText') == false) {
          $("#"+e).addClass('redText');
      }    
}

function clearError(e){
       // console.log('clearError ran');
        if ($("#"+e).hasClass('redText') == true) {
            $("#"+e).removeClass('redText');
        }
}

/*************************
  * 
  *CONVERSIONS
  *****************************/

function ConvertToHex(numberValue){
	var decNumber = Number(numberValue);
	var hexNumber = decNumber.toString(16).toUpperCase();
	return hexNumber;
}
function ConvertToBin(e){
	var decNumber = Number(e);
	var binaryNumber = decNumber.toString(2).toUpperCase();
	return binaryNumber;
}
function ConvertToDec(hexNumber){
	var decNumber = parseInt(hexNumber,16);
	return decNumber;
}
function ConvertBinToDec(binaryNumber){
	var decNumber = parseInt(binaryNumber, 2);
	return decNumber;
        
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}


function checkCDIR(e){
	var answer = '';
	//1
	if(e == 24){
		answer = 0;
	}
	//2
	else if(e == 25){
		answer = 128;
	}
	//4
	else if(e == 26){
		answer = 192;
	}
	//8
	else if(e == 27){
		answer = 224;
	}
	//16
	else if(e == 28){
		answer = 240;
	}
	//32
	else if(e == 29){
		answer = 248;
	}
	//64
	else if(e == 30){
		answer = 252;
	}
	//128
	else if(e == 31){
		answer = 254;
	}
	//256
	else if(e == 32){
		answer = 255;
	}
	return answer;
}

///pass the ip address with the cidr to get the subnet mask in binary
function setSubnetMaskBin(e){
    
	var theBin = [];
	
	return theBin;
	
}

function getSubnetMask(){
//console.log('getSubnetMask() ran')
		

		retrieveBinFromDec();
		checkCDIR($("#a5").val());//check CDIR
		checkBetween($("#a1").val())//get subnet mask
		
		
		for(var i=0;i<checkBetween($("#a1").val()).length;i++){
			//console.log(checkBetween($("#a1").val())[i]);
			var t = Number(i) + 1;
			$("#d"+t).val(checkBetween($("#a1").val())[i]);
			
		}
		if($("#a5").val() != ""){
				$("#d4").val(checkCDIR($("#a5").val()));
			}else{
				$("#d4").val('0');
			}
			
			
			retrieveBinFromSubnetMask();
			getHostID();
}


function getHostID(e){
        //console.log('getHostID runs');
	//make the whole ip address have periods and no slashes
	var res = e.replace(/\//, ".");
	//push the ip into an  array
	res = res.split(".");
	//ref for the binary
	var getBinVal = '';
	//get the proper CDIR
	var sttt = checkCDIR(res[4]);
	///convert the CIDR to binary
	getBinVal = ConvertToBin(sttt)
	//the only possible place values
	var placeVal = [128,64,32,16,8,4,2,1];
	//get track
	var totalVal = 0;
	
	for(var i=0;i<getBinVal.length;i++){
		if(getBinVal[i] == 1){
			totalVal = Number(placeVal[i]);
		}
	}
	

	
	//256 is the max so i divide the place the last one is against the place value
	var loopCount = 256 / totalVal;
	var loopNum1 = 0;
	var loopNum2 = 0;
	
	//all the possibilities in an associative array
	var possibilities  = [];
	
	if(totalVal> 0 ){
		for(var t = 0;t<loopCount;t++){
			if(loopNum2 >= totalVal -1 ){
				loopNum1 = loopNum1 + totalVal;
				loopNum2 = totalVal + loopNum2;
			}else{
				loopNum2 = totalVal + loopNum2;
			}
		
			possibilities[t] = [loopNum1,loopNum2-1];//give me a range to test against
		}
	}
	
	return possibilities;

}
