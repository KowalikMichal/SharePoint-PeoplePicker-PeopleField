#SharePoint initialization people picker and add multiple peoples to SharePoint list.

In HTML require to have:<br />
	<script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script><br />
	<script type="text/javascript" src="/_layouts/15/sp.js"></script> <br />
	<script type="text/javascript" src="/_layouts/15/clienttemplates.js"></script><br />
	<script type="text/javascript" src="/_layouts/15/clientforms.js"></script> <br />
	<script type="text/javascript" src="/_layouts/15/clientpeoplepicker.js"></script><br />
	<script type="text/javascript" src="/_layouts/15/autofill.js"></script> <br />

Add user to PeoplePikcer:<br />
  key is 'domain\\loginName' or user mail<br />
  SPClientPeoplePicker.SPClientPeoplePickerDict['peoplePickerId'+"_TopSpan"].AddUserKeys(key) <br />
To remove all users:<br />
  SPClientPeoplePicker.SPClientPeoplePickerDict['peoplePickerId'+"_TopSpan"].DeleteProcessedUser();<br />
To prevent add multiple time the same user:<br />
 SPClientPeoplePicker.SPClientPeoplePickerDict['peoplePickerId'+"_TopSpan"].DeleteProcessedUser();<br />
