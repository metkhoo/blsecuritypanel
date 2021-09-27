//NOTE: bljs.config object must be available
var blinternal = blinternal|| {}; //This object echos the items in blsecurityoptions
blinternal.config = {
	"timestamp": 0,
    "panelInterfaceRefreshRate": 0,
    "interfaceMaintainDevicesLinkEnabled": false,
    "interfaceOptionLinkEnabled": false,
    "interfaceReportsLinkEnabled": false,
    "backgroundImageFile": '',
    "alarmMode": '',
    "monitoringMessage": '',
    "alertTriggerInfo": '',
    "alertTriggerDate": '',
    "alertStatus": '',
    "panelErrorMessage": '',
    "customPanelUrl": '',
    "speech": '',
    "speechWarning":''
};

//Global parameters for functions
var blglobal = blglobal || {};
blglobal.config = {
	"autoRefresh": true,    //if true, then refresh cycle on panel is stopped when key number is pressed
	"intervalLoop": null,   //used to hold setInterval object that refreshes screen so it can be cancelled if necessary
	"optionsfilename": 'blsecurityoptions2.js', //name of the file containing the blsecurity options
	"optionscontent":"", //used to hold string that represents the blsecurityoptions file content
	"optionsrefresh": null, //used to hold setInterval object for the panel countdown so it can be cancelled if necessary
	"continueDisplay":true, //used as flag to stop countdown display
}
var autoRefresh = true; //used as flag to stop the refresh cycle if a key number is pressed
var intervalLoop;


//Build panel when doc is loaded;
document.addEventListener("DOMContentLoaded", function(event) { 
	//Randomise buttons
	var newKeysArray =[];
	if (bljs.config.juggleKeys == true){
		for (i=0 ; i < 9 ; i++){
			newKeysArray = getRandomElement(bljs.config.keysDiv, newKeysArray); //the first number
		}
		//Add last one
		newKeysArray.push(bljs.config.keysDiv[0]);
	}
	injectButtomImages();
	injectLinks();
	//Juggle the keys on the panel
	if (bljs.config.juggleKeys) {
		for (var j=0 ; j < newKeysArray.length ; j++ ){
			var elem = document.querySelector(newKeysArray[j]);
			elem.style.left = bljs.config.keysLeft[j] ;
			elem.style.top = bljs.config.keysTop[j] ;
		}
	}
	setDivText('#panelmessage',bladesecurity.options.monitoringMessage ); //Set message custom text
	var speechWarningStart =  bladesecurity.options.speechWarning.indexOf("Attention");
	var speechWarningLength = bladesecurity.options.speechWarning.length;
	var speechWarningMsg = bladesecurity.options.speechWarning.substr (speechWarningStart, speechWarningLength - speechWarningStart);
	//setDivText('#panelspeechmessage',speechWarningMsg.replace(/, ,/g, ',').replace(/.,/g,'.')); // Set speech warning echo
	//Mode
	if (bladesecurity.options.alarmMode == 'Armed') {
		setDivText('#txtsecuritymode', bljs.config.modearmedtext);//Add Security Mode custom text
	} else if (bladesecurity.options.alarmMode == 'Perimeter'){
		setDivText('#txtsecuritymode', bljs.config.modeperimetertext);//Add Security Mode custom text
	} else if (bladesecurity.options.alarmMode == 'Sleep') {
		setDivText('#txtsecuritymode', bljs.config.modesleeptext);//Add Security Mode custom text
	} else if (bladesecurity.options.alarmMode == 'Disarmed') {
		setDivText('#txtsecuritymode', bljs.config.modedisarmedtext);//Add Alert status custom text
	} else {
		setDivText('#txtsecuritymode', "unknown");//Add Alert status custom text
	}
	//Status
	if (bladesecurity.options.alertStatus == 'Normal') {
		setDivText('#txtalertstatus', bljs.config.statusnormaltext);//Add Alert status custom text
	} else if (bladesecurity.options.alertStatus == 'Triggered'){
		setDivText('#txtalertstatus', "unknown");//Add Alert status custom text
	}

	setDivText('#txtdisarm', bljs.config.titleDisarmCode); //Add disarm title from config
	setDivText('#txtsecuritymodeheading', bljs.config.titleMode); //Add Security mode heading from config
	setDivText('#txtalertstatusheading', bljs.config.titleStatus);//Add Alert status heading from config
	showCountdown('countdownTimer', bladesecurity.options.panelInterfaceRefreshRate, bljs.config.countdownSize );
	//setPanelInfo(document.theAlarmPanel.theInterface);
	startRefreshCount();
	readTextFile1(blglobal.config.optionsfilename);
	//checkForConfigChange(blglobal.config.optionsfilename, bljs.config.optionscontent);
});

//Reads a text file and places the file content into holding variable as single string
function readTextFile1(filename)
{
	var allText;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filename, true);	//Revisit this code
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
				//console.log("read:" + allText);
				blglobal.config.optionscontent = allText;
				checkForConfigChange(filename, allText);
            }
        }
    }
    rawFile.send(null); //send the request
}


//checks for a change in the config file by polling every second
function checkForConfigChange(filename, originalcontent){
	// Update the count down every 1 second
	blglobal.config.optionsRefresh = setInterval(function() {
		var allTextNew;
		var latestFile = new XMLHttpRequest(); 
		latestFile.open("GET", filename, true);	//Revisit this code
	latestFile.onreadystatechange = function ()
	{
		if(latestFile.readyState === 4)
        {
            if(latestFile.status === 200 || latestFile.status == 0)
            {
                var allNewText = latestFile.responseText;
				//console.log ("New:" + allNewText);
				if (originalcontent == allNewText) {
					//console.log ("No change");
				} else if (autoRefresh) {//We can now extract new messages here if display is not paused
					console.log ("Change to options file found");
					var items1 = originalcontent.split(",");
					var items = allNewText.split(",");
					for (var i = 0 ; i < items.length ; i++){
						var prop1 = items1[i].split(":");
						var prop = items[i].split(":");
						//prop[0] = prop[0].replace(/\n/g, '').replace(/ /g, '').replace(/"/g, '');
						//console.log("prop[1] is  =" + prop[1]);
						if (prop[1] != null) {
							prop[1] = prop[1].replace(/'/g, '').trim();
						}
						//console.log("prop[1] now=" + prop[1]);
						// 0 - timestamp
						// 1 - panelInterfaceRefreshRate (number)
						// 2 - interfaceMaintainDevicesLinkEnabled (true/false)
						// 3 - interfaceOptionLinkEnabled (true/false)
						// 4 - interfaceReportsLinkEnabled (true/false)
						// 5 - backgroundImageFile (String)
						// 6 - alarmMode (string)
						// 7 - monitoringMessage  (string)
						// 8 - alertTriggerInfo  (string)
						// 9 - alertTriggerDate  (string)
						//10 - alertStatus  (string)
						//11 - panelErrorMessage  (string)
						//12 - customPanelUrl  (string)
						//13 - speech  (string)
						//14 - speechWarning  (string)
						switch (i) {
							case 0:
								blinternal.config.timestamp = parseFloat(prop[1]);
								break;
							case 1:
								blinternal.config.panelInterfaceRefreshRate = parseFloat(prop[1]);
								break;
							case 2:
								if (prop[1] == "true") {
									blinternal.config.interfaceMaintainDevicesLinkEnabled = true;
								} else {
									blinternal.config.interfaceMaintainDevicesLinkEnabled = false;
								}					
								break;
							case 3:
								blinternal.config.interfaceOptionLinkEnabled = prop[1];
								break;
							case 4:
								blinternal.config.interfaceReportsLinkEnabled = prop[1];
								break;
							case 5:
								blinternal.config.backgroundImageFile = prop[1];
								break;
							case 6:
								blinternal.config.alarmMode = prop[1];
								break;
							case 7:
								blinternal.config.monitoringMessage = prop[1];
								break;
							case 8:
								blinternal.config.alertTriggerInfo = prop[1];
								break;
							case 9:
								blinternal.config.alertTriggerDate = prop[1];
								break;
							case 10:
								blinternal.config.alertStatus = prop[1];
								break;
							case 11:
								blinternal.config.panelErrorMessage = prop[1];
								break;
							case 12:
								blinternal.config.customPanelUrl = prop[1];
								break;
							case 13:
								blinternal.config.speech = prop[1];
								break;
							case 14:
								blinternal.config.speechWarning = prop[1];
								break;
						}
						//We now have new values for comparison
						console.log("cooke speechwarning:" + getCookie('speechWarning'));
						if (getCookie('speechWarning') == bladesecurity.options.speechWarning) {
							setDivText('#panelspeechmessage',''); // Clear speech warning echo
						}
						if (getCookie('panelErrorMessage') == bladesecurity.options.panelErrorMessage){
							setDivText('#panelerrormessage',''); // Clear speech warning echo
						} 
					}
					//refreshAlarmPanel();
				}
				//console.log("EK:" + blglobal.config.optionscontent);
				//checkForConfigChange(filename, blglobal.config.optionscontent);
				//return holdingvariable;
            }
        }
	}
		latestFile.send(null); //send the request
		
		
	}, (1000));
	return;
}

//Get a specific cookie
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function keypadNumberPressed(theNumber){
	autoRefresh = false; //disable refresh of panel when code is starting to be input
	clearInterval(bljs.config.continueDisplayTimer); //stop countdown;
	clearInterval(blglobal.config.optionsRefresh); //stop refesher
	var elem = document.getElementById('key'+theNumber);
	continueDisplay = false;
	switch (theNumber) {
		case '0': 
			elem.innerHTML=bljs.config.key0press;
			break;
		case '1':
			elem.innerHTML=bljs.config.key1press;
			break;
		case '2':
			elem.innerHTML=bljs.config.key2press;
			break;
		case '3':
			elem.innerHTML=bljs.config.key3press;
			break;
		case '4':
			elem.innerHTML=bljs.config.key4press;
			break;
		case '5':
			elem.innerHTML=bljs.config.key5press;
			break;
		case '6':
			elem.innerHTML=bljs.config.key6press;
			break;
		case '7':
			elem.innerHTML=bljs.config.key7press;
			break;
		case '8':
			elem.innerHTML=bljs.config.key8press;
			break;
		case '9':
			elem.innerHTML=bljs.config.key9press;

	}
    document.theAlarmPanel.disarm_code.value = document.theAlarmPanel.disarm_code.value + theNumber;
    var i=0;
    var theCode='';
    for (i=1;i<=document.theAlarmPanel.disarm_code.value.length;i++){
        theCode = theCode + bljs.config.charForCode;  
    }
    document.getElementById('userDisarmCode').innerHTML=theCode;
	//wait a fraction then restore 
	setTimeout(function(){
		switch (theNumber) {
			case '0': 
				elem.innerHTML=bljs.config.key0norm;
				break;
			case '1':
				elem.innerHTML=bljs.config.key1norm;
				break;
			case '2':
				elem.innerHTML=bljs.config.key2norm;
				break;
			case '3':
				elem.innerHTML=bljs.config.key3norm;
				break;
			case '4':
				elem.innerHTML=bljs.config.key4norm;
				break;
			case '5':
				elem.innerHTML=bljs.config.key5norm;
				break;
			case '6':
				elem.innerHTML=bljs.config.key6norm;
				break;
			case '7':
				elem.innerHTML=bljs.config.key7norm;
				break;
			case '8':
				elem.innerHTML=bljs.config.key8norm;
				break;
			case '9':
				elem.innerHTML=bljs.config.key9norm;
		}
	}, bljs.config.keypressinterval);
}

//Will provide 10 dots to show countdown 
function refreshmarker(){
	document.getElementById('userDisarmCode').innerHTML="..........";
}

function clearDisarmCode() {
	autoRefresh = true;
	document.getElementById('panelerrormessage').innerHTML=""; //Clear message
	var elem = document.getElementById('keyclear'); //Clear current display of code
	
	elem.innerHTML=bljs.config.keyclearpress;
	setTimeout(function(){
		elem.innerHTML = bljs.config.keyclearnorm;
	}, bljs.config.keypressinterval);
    document.theAlarmPanel.disarm_code.value = '';
    document.getElementById('userDisarmCode').innerHTML="";
}

function checkAction(action){
	document.cookie = "timestamp=" + bladesecurity.options.timestamp + ""    		//set a cookie with current timestamp
	document.cookie = "panelErrorMessage=" + bladesecurity.options.panelErrorMessage //set a cookie with current panelErrorMessage
	document.cookie = "speechwarning=" + bladesecurity.options.speechWarning; 		//set cookie with current speech warning
	var elem;
	if (action !='Refresh') {
		autoRefresh = true;
		clearInterval(blglobal.config.optionsrefresh);
	}
    if(action == 'Arm')
    {
		elem= document.getElementById('keyarm');
		elem.innerHTML=bljs.config.keyarmpress;
		setTimeout(function(){
			elem.innerHTML = bljs.config.keyarmnorm;
			document.theAlarmPanel.panel_action.value = 'Arm';
        document.theAlarmPanel.submit();
		}, bljs.config.keypressinterval);
    }
    else if(action == 'Perimeter')
    {
		elem= document.getElementById('keyperimeter');
		elem.innerHTML=bljs.config.keyperimeterpress;
		setTimeout(function(){
			elem.innerHTML = bljs.config.keyperimeternorm;
			document.theAlarmPanel.panel_action.value = 'Perimeter';
			document.theAlarmPanel.submit();
		}, bljs.config.keypressinterval);
    }
    else if(action == 'Sleep')
    {
		elem= document.getElementById('keysleep');
		elem.innerHTML=bljs.config.keysleeppress;
		setTimeout(function(){
			elem.innerHTML = bljs.config.keysleepnorm;
			document.theAlarmPanel.panel_action.value = 'Sleep';
			document.theAlarmPanel.submit();
		}, bljs.config.keypressinterval);
    }
    else if(action == 'Disarm')
    {
		elem= document.getElementById('keydisarm');
		elem.innerHTML=bljs.config.keydisarmpress;
		setTimeout(function(){
			elem.innerHTML = bljs.config.keydisarmnorm;
			 document.theAlarmPanel.panel_action.value = 'Disarm';
			document.theAlarmPanel.submit();
		}, bljs.config.keypressinterval);
    }
    else if(action == 'Reset')
    {
		elem = document.getElementById('keyreset');
		elem.innerHTML=bljs.config.keyresetpress;
		console.log("set");
		setTimeout(function(){
			elem.innerHTML = bljs.config.keyresetnorm;
			document.theAlarmPanel.panel_action.value = 'Reset';
			document.theAlarmPanel.submit();	
		}, bljs.config.keypressinterval);
    }
    else if(action == 'Refresh')
    {
		document.theAlarmPanel.panel_action.value = 'Refresh';
        document.theAlarmPanel.submit();
    }
    else if(action == 'Options')
    {
        document.theAlarmPanel.panel_action.value = 'Options';
        document.theAlarmPanel.submit();
    }
    else if(action == 'Reports')
    {
        document.theAlarmPanel.panel_action.value = 'Reports';
        document.theAlarmPanel.submit();
    }
    else if(action == 'MaintainDevices')
    {
        document.theAlarmPanel.panel_action.value = 'MaintainDevices';
        document.theAlarmPanel.submit();
    }
    else if(action == 'Support')
    {
        window.open(bljs.config.urisupport);
    }
    else if(action == 'Help')
    {
        window.open(bljs.config.urihelp);
    }
}

function findPosX(obj){
    var curleft = 0;
    if(obj.offsetParent) {
        while(obj.offsetParent) {
            curleft += obj.offsetLeft;
            obj = obj.offsetParent;
        }
    } else {
        if(obj.x)
            curleft += obj.x;
    }
    return curleft;
}

function findPosY(obj) {
    var curtop = 0;
    if(obj.offsetParent){
        while(obj.offsetParent){
            curtop += obj.offsetTop;
            obj = obj.offsetParent;
        }
    } else {
        if(obj.x)
            curtop += obj.y;
    }
    return curtop;
}

function refreshAlarmPanel() {
  if (autoRefresh) {
    checkAction('Refresh');
  }
}

function startRefreshCount() {
  intervalLoop = setInterval("refreshAlarmPanel()", (bladesecurity.options.panelInterfaceRefreshRate * 1000));
}

function getRandomElement(Array, NewArray){
	var pos = Math.floor(Math.random() * Array.length);
	var val = Array[pos];
	NewArray.push(val);
	Array.splice(pos,1);
	return NewArray;
}

function setPanelInfo(obj) {
//Things are now absolute so no need for this
    //var theLeft = findPosX(obj);
    //var theTop = findPosY(obj);
}

//Direct to custom form
function formAction(form) {
    form.action = bladesecurity.options.panelHtml;
}

//Set text in a div
function setDivText(divsel, txt) {
	var elem = document.querySelector(divsel);
	elem.innerHTML = txt;
}

function positionDiv(divsel, top, left) {
	var elem = document.querySelector(divsel);
	elem.style.top = top;
	elem.style.left = left;
}

function injectLinks(){
	var elem;
	elem = document.querySelector('#lnkoptions');
	elem.innerHTML='';
	if (bladesecurity.options.interfaceOptionLinkEnabled) {
		elem.innerHTML=bljs.config.interfaceOptionLinkText;
	}
	elem = document.querySelector('#lnkmaintaindevices');
	elem.innerHTML='';
	if (bladesecurity.options.interfaceMaintainDevicesLinkEnabled) {
		elem.innerHTML=bljs.config.interfaceMaintainDevicesLinkText;
	}
	elem = document.querySelector('#lnkreports');
	elem.innerHTML='';
	if (bladesecurity.options.interfaceReportsLinkEnabled =='true'){
		elem.innerHTML=bljs.config.interfaceReportsLinkText;
	} 
	elem = document.querySelector('#lnksupport');
	elem.innerHTML='';
	if (bljs.config.interfaceSupportLinkEnabled) {
		elem.innerHTML=bljs.config.interfaceSupportLinkText;
	}
	elem = document.querySelector('#lnkhelp');
	elem.innerHTML='';
	if (bljs.config.interfaceHelpLinkEnabled){
		elem.innerHTML=bljs.config.interfaceHelpLinkText;
	}
	return "";
}
//puts a countdown marker in the div provided
function showCountdown(divName, intervalTotal, maxChars){
	var secondsRefreshRate = intervalTotal/maxChars;
	var charToUse = '*';
	var expiredStr = "!";
	var countDownDate = new Date().getTime() + (intervalTotal * 1000);
	//document.getElementById(divName).innerHTML = charToUse.repeat(maxChars);
	document.getElementById(divName).innerHTML = Array(maxChars).join(charToUse); //hack to support lack of repeat in IE
	// Update the count down every 1 second
	bljs.config.continueDisplayTimer = setInterval(function() {
			if (bljs.config.continueDisplay) {
				// Get today's date and time
				var now = new Date().getTime();
				// Find the distance between now and the count down date
				var distance = countDownDate - now;
				var seconds = Math.floor((distance % (1000 * 60)) / 1000);
				// Display the result in the element with id="demo"
				var val=document.getElementById(divName).innerHTML;
				document.getElementById(divName).innerHTML = val.substr(1, val.length-1);
				// If the count down is finished, write some text 
				if (distance < 0) {
					//clearInterval(x);
					document.getElementById(divName).innerHTML = expiredStr;
				}
			} else {
					document.getElementById(divName).innerHTML = '';
			}
		}, (secondsRefreshRate * 1000));
	return;
}

//Inject button images
function injectButtomImages() {
	document.getElementById('key0').innerHTML=bljs.config.key0norm;
	document.getElementById('key1').innerHTML=bljs.config.key1norm;
	document.getElementById('key2').innerHTML=bljs.config.key2norm;
	document.getElementById('key3').innerHTML=bljs.config.key3norm;
	document.getElementById('key4').innerHTML=bljs.config.key4norm;
	document.getElementById('key5').innerHTML=bljs.config.key5norm;
	document.getElementById('key6').innerHTML=bljs.config.key6norm;
	document.getElementById('key7').innerHTML=bljs.config.key7norm;
	document.getElementById('key8').innerHTML=bljs.config.key8norm;
	document.getElementById('key9').innerHTML=bljs.config.key9norm;
	document.getElementById('keyarm').innerHTML=bljs.config.keyarmnorm;
	document.getElementById('keyperimeter').innerHTML=bljs.config.keyperimeternorm;
	document.getElementById('keysleep').innerHTML=bljs.config.keysleepnorm;
	document.getElementById('keydisarm').innerHTML=bljs.config.keydisarmnorm;
	document.getElementById('keyreset').innerHTML=bljs.config.keyresetnorm;
	document.getElementById('keyclear').innerHTML=bljs.config.keyclearnorm;
	document.getElementById('panelerrormessage').innerHTML=bladesecurity.options.panelErrorMessage;
	return "";
}
