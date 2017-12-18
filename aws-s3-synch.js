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

function synchToS3(params, cb) {

	var {source, destination, test, deleteRemoved} = params;
	var syncCommand = "s3cmd sync -r --no-mime-magic --guess-mime-type";

	const accessKey = process.env.AWS_ACCESS_KEY_ID || params.AWS_ACCESS_KEY_ID;
	const secretKey = process.env.AWS_SECRET_ACCESS_KEY || params.AWS_SECRET_ACCESS_KEY;

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

	if (accessKey && secretKey)
		syncCommand = syncCommand + ` --access_key=${accessKey} --secret_key=${secretKey}`;

	console.log("syncCommand : ", syncCommand);
	console.log("\n");

	console.log("--> Syncing on S3\n");
	try {
		execute(syncCommand);
		console.log("\n====== Successfully synched to [", destination, "] ======\n");
		if (cb && typeof cb === "function") return cb();
	} catch (e) {
		console.log("Error In Syncing Removed Files from : ", destination);
		console.log("Error Command : ", syncCommand);
		console.log("Errors : ", JSON.stringify(e));
		if (cb && typeof cb === "function") return cb();
	} 

}


function synchFromS3(params, cb) {

	var force = params.force ? "--force": "";
	var skipExisting = params.skipExisting ? "--skip-existing" : "";
	var dryRun = params.test ? "--dry-run" : "";
	var Continue   = params.continue ? "--continue" : "";

	var syncCommand = `s3cmd ${force} ${skipExisting} ${dryRun} ${Continue} --recursive get ${params.source} ${params.destination}`;

	const accessKey = process.env.AWS_ACCESS_KEY_ID || params.AWS_ACCESS_KEY_ID;
	const secretKey = process.env.AWS_SECRET_ACCESS_KEY || params.AWS_SECRET_ACCESS_KEY;
	
	if (accessKey && secretKey)
		syncCommand = syncCommand + ` --access_key=${accessKey} --secret_key=${secretKey}`;
	
	console.log("syncCommand : ", syncCommand);
	console.log("\n");

	console.log("--> Syncing From S3\n");
	try {
		execute(syncCommand);
		console.log("\n====== Successfully synched [", params.destination, "] ======\n");
		if (cb && typeof cb === "function") return cb();
	} catch (e) {
		// console.log("Error In Syncing Removed Files from : ", destination);
		console.log("Error Command : ", syncCommand);
		console.log("Errors : ", JSON.stringify(e));
		if (cb && typeof cb === "function") return cb(e);
	} 


}


module.exports = {

	synchToS3(params, cb) {
		// console.log("Params => ", params);

		Joi.validate(params, schemas.synchToS3, (err, details) => {
			if (err) {
				// console.log("Error===> ", (JSON.stringify(err))) ;
				if (cb && typeof cb === "function") return cb(err);
			}

			// console.log(params);
			synchToS3(params, cb);

		});
	},
	synchFromS3(params, cb) {
		// console.log("Params => ", params);

		Joi.validate(params, schemas.synchFromS3, (err, details) => {
			if (err) {
				// console.log("Error===> ", (JSON.stringify(err))) ;
				if (cb && typeof cb === "function") return cb(err);
			}

			console.log(params);
			synchFromS3(params, cb);

		});
	},

}
