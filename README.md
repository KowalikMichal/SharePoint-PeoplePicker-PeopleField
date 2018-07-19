# SharePoint initialization people picker and add multiple peoples to SharePoint list.

## In HTML require to have:<br />
```
	<script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
	<script type="text/javascript" src="/_layouts/15/sp.js"></script>
	<script type="text/javascript" src="/_layouts/15/clienttemplates.js"></script>
	<script type="text/javascript" src="/_layouts/15/clientforms.js"></script>
	<script type="text/javascript" src="/_layouts/15/clientpeoplepicker.js"></script>
	<script type="text/javascript" src="/_layouts/15/autofill.js"></script>
```

## Add user to PeoplePikcer:<br />
```
  key is 'domain\\loginName' or user mail
  SPClientPeoplePicker.SPClientPeoplePickerDict['peoplePickerId'+"_TopSpan"].AddUserKeys(key);
```
## To remove all users:<br />
```
  SPClientPeoplePicker.SPClientPeoplePickerDict['peoplePickerId'+"_TopSpan"].DeleteProcessedUser();
```
## To prevent add multiple time the same user:<br />
```
 SPClientPeoplePicker.SPClientPeoplePickerDict['peoplePickerId'+"_TopSpan"].DeleteProcessedUser();
 ```
