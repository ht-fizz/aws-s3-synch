var Joi = require('joi');
var schemas = require("./schemas");
const exec = require('child_process').execSync;

function execute ( command, cwd, out ) {
	if ( out )
		return cwd ? exec(command, {cwd: cwd}).toString() : exec(command).toString();			
	else if ( cwd )
		return exec(command, {stdio: 'inherit', cwd: cwd})	
	else
		exec(command, {stdio: 'inherit'})	
}

function synchToS3(params) {

	var {source, destination, test, deleteRemoved} = params;
	var syncCommand = "s3cmd sync -r --no-mime-magic --guess-mime-type";

	if (params.deleteRemoved) {
		syncCommand += " --delete-removed";
	}

	if ( test ) {
		syncCommand += " --dry-run";
	}

	if (params.excludeFile) {
		syncCommand += " --exclude-from " + params.excludeFile;
	}

	syncCommand += " " + source + " " + destination;

	console.log("syncCommand : ", syncCommand);
	console.log("\n");

	console.log("--> Syncing on S3\n");
	try {
		execute(syncCommand);		
	} catch (e) {
		console.log("Error In Syncing Removed Files from : ", destination);
		console.log("Error Command : ", syncCommand);
		console.log("Errors : ", JSON.stringify(e));
		return e;
	} 

	console.log("\n====== Successfully deployed to [", destination, "] ======\n");
}


module.exports = {

	synchToS3(params) {
		console.log("Params => ", params);

		Joi.validate(params, schemas.synchToS3, (err, details) => {
			if (err) return console.log("Error===> ", (JSON.stringify(err))) ;

			console.log(params);

			synchToS3(params);

		});
	}

}
