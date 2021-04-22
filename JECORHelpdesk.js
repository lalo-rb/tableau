(function () {
    var myConnector = tableau.makeConnector();

myConnector.getSchema = function (schemaCallback) {
	var cols = [{
		id: "urgencyLevel",
		alias: "Priority",
		dataType: tableau.dataTypeEnum.int
	},{
    		id: "_Id",
        	alias: "Incident ID",
		dataType: tableau.dataTypeEnum.string
	},{
    		id: "problemCategory",
        	alias: "Category",
		dataType: tableau.dataTypeEnum.string

	},{
    		id: "description", 
        	alias: "Description",
		dataType: tableau.dataTypeEnum.string
	},{
    		id: "departament",
        	alias: "Team Assigned",
		dataType: tableau.dataTypeEnum.string
   	},{
    		id: "state",
        	alias: "Status",
        	dataType: tableau.dataTypeEnum.int
   	},{
    		id: "creator",  
	        alias: "Owner",
        	dataType: tableau.dataTypeEnum.string
	},{
    		id: "departamentOrigin",
		alias: "Team Owner",
	        dataType: tableau.dataTypeEnum.string
        },{
    		id: "time",
	        alias: "Logged Time",
		dataType: tableau.dataTypeEnum.string
	},{
    		id: "startTime",
        	alias: "Start Time",
		dataType: tableau.dataTypeEnum.string
	},{
    		id: "assigned",
		alias: "Assigned User",
        	dataType: tableau.dataTypeEnum.string
	},{
		id: "endTime",
		alias: "End Time",
        	dataType: tableau.dataTypeEnum.string
	},{
		id: "cancel",
		alias: "Cancel User",
        	dataType: tableau.dataTypeEnum.string
	},{
    		id: "cancelTime",
		alias: "Cancel Time",
		dataType: tableau.dataTypeEnum.string
	},{
		id: "answer",
		alias: "Comment",
		dataType: tableau.dataTypeEnum.string
	},{
		id : "authorized",
		alias: "Authorized User",
        	dataType: tableau.dataTypeEnum.string
	},{
		id: "answerTime",
		alias: "Answer Time",
	        dataType: tableau.dataTypeEnum.int
	}];

	var tableSchema = {
            id: "reports",
            alias: "Incidents reported by company teams to be solved",
            columns: cols
        };

	schemaCallback([tableSchema]);
};

myConnector.getData = function(table, doneCallback) {
    $.getJSON("http://jecortraspasos.ddns.net:5550/jecor/api/reports/termino/TI", function(resp) {
console.log(resp);        
var feat = resp.reports,
            tableData = [];

        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "urgencyLevel": feat[i].urgencyLevel,
                "_Id": feat[i]._id,
                "problemCategory": feat[i].problemCategory,
                "description": feat[i].description,
		"departament": feat[i].department,
		"state": feat[i].state,
		"creator": feat[i].creator,
		"departamentOrigin": feat[i].departmentOrigin,
		"time": feat[i].time,
		"startTime": feat[i].startTime,
		"assigned": feat[i].assigned,
		"endTime": feat[i].endTime,
		"cancel": feat[i].cancel,
		"answer": feat[i].answer,
		"authorized": feat[i].authorized,
		"answerTime": feat[i].answerTime
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};

    tableau.registerConnector(myConnector);

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "JECOR Helpdesk Feed";
        tableau.submit();
 });
    });
})();