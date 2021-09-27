/* Panel configuration object */
var bljs = bljs || {};
bljs.config = {
	"continueDisplayTimer":null, //
	"continueDisplay":true, //used as flag to stop countdown timer
	"countdownSize":11, //character length of the countdown 
	"charForCode": "X", //Character to use for disarm code echo
	"juggleKeys": true, //Controls juggling of keys
	//Names of IDs of numeric keys for key juggling
	"keysDiv":['#key1', '#key2', '#key3', '#key4', '#key5', '#key6', '#key7', '#key8', '#key9', '#key0' ],
	//Left positions of numeric keys for key juggling
	"keysLeft":['2px','114px','226px', '2px', '114px', '226px', '2px', '114px', '226px', '114px'],
	//Top positions of numeric keys for key juggling
	"keysTop":['2px', '2px', '2px', '74px', '74px', '74px', '146px', '146px', '146px', '218px'],
	"titleDisarmCode": "<u>Disarm Code</u>",//Text for title - Disarm Code title text
	"titleMode": "Security Mode:",//Text for title - Security Mode
	"titleStatus":"Alert Status:",//Text for title - Alert Status
	//interfaceOptionLinkEnabled - set in blsecurityoptions.js by plug-in
	"interfaceOptionLinkText": "Options",//Text for Options Link
	//interfaceMaintainDevicesLinkEnabled - set in blsecurityoptions.js by plug-in
	"interfaceMaintainDevicesLinkText": "Maintain Devices",//Text for Maintain Devices Link
	//interfaceReportsLinkEnabled - set in blsecurityoptions.js by plug-in
	"interfaceReportsLinkText": "Reports", //Text for Reports Link
	"interfaceSupportLinkEnabled": false,
	"interfaceSupportLinkText": "Support",//Text for Support Link
	"interfaceHelpLinkEnabled": false,
	"interfaceHelpLinkText": "Help",//Text for Help Link
	"panelImg":'<img src="blsecurity_interface.gif" align="absmiddle">',	//URL for panel image
	"urisupport": "http://forums.homeseer.com/forumdisplay.php?f=1033", //Support URI
	"urihelp": "/BLHelp/BLSecurity/BLSecurity_Help.asp",//Help URI
	"defaultMessage": "Monitoring Mode Disabled",//Default Message Text
	"modesleeptext":'<img src="img/lock-armed.gif" align="absmiddle">&nbsp;Stay',//Mode Stay text
	"modearmedtext":'<img src="img/lock-armed.gif" align="absmiddle">&nbsp;Armed',//Mode Armed text
	"modedisarmedtext": '<img src="img/lock-disarmed.gif" align="absmiddle">&nbsp;Disarmed',//Mode Disarmed text
	"modeperimetertext": '<img src="img/lock-armed.gif" align="absmiddle">&nbsp;Perimeter',//Mode Perimeter text
	"statusnormaltext": '<img src="img/alarm-normal.gif" align="absmiddle">&nbsp;Normal',//Status Normal text
	"statusarmedtext": '<img src="img/alarm-normal.gif" align="absmiddle">&nbsp;Armed',//Status Armed text
	"keypressinterval":100,   //interval to wait after pressing key before returning to normal image
	"key0norm": '<img src="img/0button.png" width="110", height="70">',              //HTML for image key 0
	"key0press": '<img src="img/buttonpressedbig.gif" width="110", height="70">',        //HTML for pressed key 0
	"key1norm": '<img src="img/1button.png" width="110", height="70">',              //HTML for image key 1
	"key1press": '<img src="img/buttonpressedbig.gif">',       //HTML for pressed key 1
	"key2norm": '<img src="img/2button.png" width="110", height="70">',              //HTML for image key 2
	"key2press": '<img src="img/buttonpressedbig.gif">',       //HTML for pressed key 2
	"key3norm": '<img src="img/3button.png" width="110", height="70">',              //HTML for image key 3
	"key3press": '<img src="img/buttonpressedbig.gif">',       //HTML for pressed key 3
	"key4norm": '<img src="img/4button.png" width="110", height="70">',              //HTML for image key 4
	"key4press": '<img src="img/buttonpressedbig.gif">',       //HTML for pressed key 4
	"key5norm": '<img src="img/5button.png" width="110", height="70">',              //HTML for image key 5
	"key5press": '<img src="img/buttonpressedbig.gif">',       //HTML for pressed key 5
	"key6norm": '<img src="img/6button.png" width="110", height="70">',              //HTML for image key 6
	"key6press": '<img src="img/buttonpressedbig.gif">',       //HTML for pressed key 6
	"key7norm": '<img src="img/7button.png" width="110", height="70">',              //HTML for image key 7
	"key7press": '<img src="img/buttonpressedbig.gif">',       //HTML for pressed key 7
	"key8norm": '<img src="img/8button.png" width="110", height="70">',              //HTML for image key 8
	"key8press": '<img src="img/buttonpressedbig.gif">',       //HTML for pressed key 8
	"key9norm": '<img src="img/9button.png" width="110", height="70">',              //HTML for image key 9
	"key9press": '<img src="img/buttonpressedbig.gif">',       //HTML for pressed key 9
	"keyclearnorm": '<img src="img/Cbutton.png" width="110", height="70">',        //HTML for clear`
	"keyclearpress": '<img src="img/buttonpressedbig.gif">',   //HTML for clear pressed
	"keyresetnorm":'<img src="img/StarButton.png" width="110", height="70">',         //HTML for reset 
	"keyresetpress":'<img src="img/buttonpressedbig.gif">',    //HTML for reset pressed
	"keyarmnorm":'<img src="img/buttonW2Arm.gif" width="170" height="70">',            //HTML for image arm key
	"keyarmpress":'<img src="img/buttonpressed2.gif">',        //HTML for arm key pressed
	"keyperimeternorm":'<img src="img/buttonW2Perimeter.gif" width="170" height="70">',//HTML for perimeter key
	"keyperimeterpress":'<img src="img/buttonpressed2.gif">',  //HTML for perimeter pressed
	"keysleepnorm":'<img src="img/buttonW2Stay.gif" width="170" height="70">',         //HTML for sleep mode
	"keysleeppress":'<img src="img/buttonpressed2.gif">',      //HTML for sleep mode pressed
	"keydisarmnorm":'<img src="img/buttonW2Disarm.gif" width="170" height="70">',      //HTML for disarm mode
	"keydisarmpress":'<img src="img/buttonpressed2.gif" >'      //HTML for disarm mode pressed
}