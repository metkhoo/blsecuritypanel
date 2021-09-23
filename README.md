# BLsecuritypanel
This is a customisation of the Homeseer Alarm panel for the BLADE plug in "BLSecurity" (HS3 version)

# Installing the solution
Simply copy the files into the folder:

C:\Program Files (x86)\{Your homeseer installation folder}\html

# Setting up within the Plugin
Open the Plug in and select "Options"
Scroll down to "Custom Alarm Panel"
Enter the relative path and name of the htm file that is your new alarm panel

As an example, if the javascript files would have been previously installed to:

C:\Program Files (x86)\{Your homeseer installation folder}\html

Then this folder is the "root" of the built in HTTP server and your new custom panel will be specified as:

\blsecurity\NewAlarmPanel.html

# You own customisations
You can modify the images as you wish

# The files
blconfig.js - this file is used to specify the working parameters.  

- continueDisplayTimer - boolean.
- continueDisplay - boolean.  Can be "true" of "false",  used as flag to stop countdown timer
- countdownSize - number. Defaut 11.  The character length of the countdown 
- charForCode - string.  Default "X".  The Character to use for disarm code echo
- juggleKeys - boolean.  Default true.  Controls juggling of panel keys
	//Names of IDs of numeric keys for key juggling
- keysDiv - array of strings.  Default ['#key1', '#key2', '#key3', '#key4', '#key5', '#key6', '#key7', '#key8', '#key9', '#key0' ].  The names of the HTML divs that define the numeric keys.
- keysLeft - array of strings.  Default ['2px','114px','226px', '2px', '114px', '226px', '2px', '114px', '226px', '114px'].  The pixel settings that specify the left postions of each of the keys.
- keysTop - array of strings.  Default ['2px', '2px', '2px', '74px', '74px', '74px', '146px', '146px', '146px', '218px'].  The pixel settings that define the top of each of the keys for juggling.
- titleDisarmCode - string.  Default "<u>Disarm Code</u>".  Disarm Code title text for panel
- titleMode - string.  Default "Security Mode:".  Security mode text for panel
- titleStatus - string.  Default "Alert Status:".  Alert Status text for panel
- interfaceOptionLinkEnabled. Set in blsecurityoptions.js by plug-in
- interfaceOptionLinkText. Default "Options".  Options link text for panel
- interfaceMaintainDevicesLinkEnabled - set in blsecurityoptions.js by plug-in
- interfaceMaintainDevicesLinkText": "Maintain Devices",//Text for Maintain Devices Link
- interfaceReportsLinkEnabled - set in blsecurityoptions.js by plug-in
- interfaceReportsLinkText": "Reports", //Text for Reports Link
- interfaceSupportLinkEnabled": false,
- interfaceSupportLinkText": "Support",//Text for Support Link
- interfaceHelpLinkEnabled": false,
- interfaceHelpLinkText - string. Default "Help".  Text used for the "Help" Link
- panelImg - string. Default '`<img src="blsecurity_interface.gif" align="absmiddle">`'.  The URL for the panel background image
- urisupport - string. Default "http://forums.homeseer.com/forumdisplay.php?f=1033".  Support URI
- urihelp": "/BLHelp/BLSecurity/BLSecurity_Help.asp",//Help URI
- defaultMessage : "Monitoring Mode Disabled",//Default Message Text
- modesleeptext - string.  Default '`<img src="img/lock-armed.gif" align="absmiddle">&nbsp;Stay`'.  Stay mode text
- modearmedtext- string.  Default '`<img src="img/lock-armed.gif" align="absmiddle">&nbsp;Armed`'.  Armed mode Armed text
- modedisarmedtext - string. Default '`<img src="img/lock-disarmed.gif" align="absmiddle">&nbsp;Disarmed`'. Disarmed mode text
- modeperimetertext - string. Default '`<img src="img/lock-armed.gif" align="absmiddle">&nbsp;Perimeter`'.  Perimeter mode text
- statusnormaltext - string. Default '`<img src="img/alarm-normal.gif" align="absmiddle">&nbsp;Normal`'.  Normal status text
- statusarmedtext - string. Default '`<img src="img/alarm-normal.gif" align="absmiddle">&nbsp;Armed`'. Armed status text
- keypressinterval - nuimber.  Default 100.  Interval to wait after pressing key before returning to normal image
- key0norm - string.  Default '`<img src="img/0button.png" width="110", height="70">`',              //HTML for image key 0
- key0press - string.  Default '`<img src="img/buttonpressedbig.gif" width="110", height="70">`',        //HTML for pressed key 0
- key1norm - string.  Default '`<img src="img/1button.png" width="110", height="70">`',              //HTML for image key 1
- key1press - string.  Default '`<img src="img/buttonpressedbig.gif">`',       //HTML for pressed key 1
- key2norm": '`<img src="img/2button.png" width="110", height="70">`',              //HTML for image key 2
- key2press": '`<img src="img/buttonpressedbig.gif">`',       //HTML for pressed key 2
- key3norm": '`<img src="img/3button.png" width="110", height="70">`',              //HTML for image key 3
- key3press": '`<img src="img/buttonpressedbig.gif">`',       //HTML for pressed key 3
- key4norm": '`<img src="img/4button.png" width="110", height="70">`',              //HTML for image key 4
- key4press": '`<img src="img/buttonpressedbig.gif">`',       //HTML for pressed key 4
- key5norm": '`<img src="img/5button.png" width="110", height="70">`',              //HTML for image key 5
- key5press": '`<img src="img/buttonpressedbig.gif">`',       //HTML for pressed key 5
- key6norm": '`<img src="img/6button.png" width="110", height="70">`',              //HTML for image key 6
- key6press": '`<img src="img/buttonpressedbig.gif">`',       //HTML for pressed key 6
- key7norm": '`<img src="img/7button.png" width="110", height="70">`',              //HTML for image key 7
- key7press": '`<img src="img/buttonpressedbig.gif">`',       //HTML for pressed key 7
- key8norm": '`<img src="img/8button.png" width="110", height="70">`',              //HTML for image key 8
- key8press": '`<img src="img/buttonpressedbig.gif">`',       //HTML for pressed key 8
- key9norm": '`<img src="img/9button.png" width="110", height="70">`',              //HTML for image key 9
- key9press": '`<img src="img/buttonpressedbig.gif">`',       //HTML for pressed key 9
- keyclearnorm": '`<img src="img/Cbutton.png" width="110", height="70">`',        //HTML for clear`
- keyclearpress": '`<img src="img/buttonpressedbig.gif">`',   //HTML for clear pressed
- keyresetnorm": '`<img src="img/StarButton.png" width="110", height="70">`',         //HTML for reset 
- keyresetpress": '`<img src="img/buttonpressedbig.gif">`',    //HTML for reset pressed
- keyarmnorm": '`<img src="img/buttonW2Arm.gif" width="170" height="70">`',            //HTML for image arm key
- keyarmpress": '`<img src="img/buttonpressed2.gif">`',        //HTML for arm key pressed
- keyperimeternorm":'`<img src="img/buttonW2Perimeter.gif" width="170" height="70">`',//HTML for perimeter key
- keyperimeterpress":'`<img src="img/buttonpressed2.gif">`',  //HTML for perimeter pressed
- keysleepnorm":'`<img src="img/buttonW2Stay.gif" width="170" height="70">`'. HTML for sleep mode image
- keysleeppress":'`<img src="img/buttonpressed2.gif">`',      //HTML for sleep mode image pressed
- keydisarmnorm" - string. Default '`<img src="img/buttonW2Disarm.gif" width="170" height="70">`'. HTML for disarm mode image normal
- keydisarmpress - string.  Default '`<img src="img/buttonpressed2.gif" >`'.  HTML for disarm mode image pressed
