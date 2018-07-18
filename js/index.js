var deferred = new $.Deferred();

$(function(){
	SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function(){
		initializePeoplePicker('peoplePickerITDC', 109); //initializePeoplePicker(divPeoplePicker, SharePointGroup)
	});
});

//initializePeoplePicker
function initializePeoplePicker(peoplePickerElementId, GroupID) {
	var schema = {};
		schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
		schema['SearchPrincipalSource'] = 15;
		schema['ResolvePrincipalSource'] = 15;
		schema['AllowMultipleValues'] = true;
		schema['MaximumEntitySuggestions'] = 50;
		schema['Width'] = '480px';
		schema['SharePointGroupID'] = GroupID; //get user only from group
	this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}

//add to SharePoint
function create() {
	getUserInfo();
	deferred.done(function(userMail) {
		var user = SP.FieldUserValue.fromUser(userMail);
		var clientContext = new SP.ClientContext.get_current();	
		var oList = clientContext.get_web().get_lists().getByTitle('ListTitle');
		var itemCreateInfo = new SP.ListItemCreationInformation();
		var PeopleId = new SP.FieldLookupValue();
			PeopleId.set_lookupId(1);
		this.oListItem = oList.addItem(itemCreateInfo);
			oListItem.set_item('Title', 'Example title');
			oListItem.set_item('PeopleFiled', userMail); //set by email
			oListItem.set_item('_x0061_tj7', PeopleId); //set by id
		oListItem.update();
			clientContext.executeQueryAsync(
				Function.createDelegate(this, function(){
					alert('Succeeded created record!');
				}),
				Function.createDelegate(this, function(){
					alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
			}));
	});
}

function getUserInfo() {
	var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerITDC_TopSpan;
	var users = peoplePicker.GetAllUserInfo();
	var userMail = [];
	$.each(users, function(index, element){
		 $.when(GetUserIdFromUserName(element.Key)).done(function(data){
			$.map(data, function(n){
				userMail.push(SP.FieldUserValue.fromUser(n.Email)); //Create for each people in peoplepicker field user value
			});
			if (userMail.length == users.length) return deferred.resolve(userMail);
		});
	});
}

function GetUserIdFromUserName(userName) {
		var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
		var accountName = userName;
		return $.ajax({
					url: siteUrl + "/_api/web/siteusers(@v)?@v='" + 
						encodeURIComponent(accountName) + "'",
					method: "GET",
					headers: { "Accept": "application/json; odata=verbose" },
					success: function (data) {
						return data.d.Emai;
					},
					error: function (data) {
						return (JSON.stringify(data));
					}
				});
}