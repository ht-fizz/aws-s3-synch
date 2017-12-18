var path = require('path');
var awsSynch = require("./aws-s3-synch");

/*

var params = {

	// [required] Source directory or file path on AWS
	source: `s3://my-test-bucket/folder1/folder2/`,

	// [required] Destination directory path on target machine.
	destination: path.join(__dirname, "test"),
	
	// [required] Skip if respective file already exists in destination directory
	skipExisting: true,

	// [required] For an operation, it takes precedence on skipExisting
	force: false,

	// [required] true means simulate, false means perform respective action in bucket
	test: true,


	// [optional, default: false] if download fails due to slow internet or somehow, use continue: true to resume
	continue: false,

	//[optional pair] specify the amazon access key and secret
	//If sent as env variable, then these will be overriden
	//if neiher sent as env varibale nor specified in params then will read from default .s3cfg file
	// AWS_ACCESS_KEY_ID: "AWS_ACCESS_KEY_ID",
	// AWS_SECRET_ACCESS_KEY: "AWS_SECRET_ACCESS_KEY"
};

awsSynch.synchFromS3(params);
*/

module.exports = {
	synchToS3: awsSynch.synchToS3,
	synchFromS3: awsSynch.synchFromS3
}