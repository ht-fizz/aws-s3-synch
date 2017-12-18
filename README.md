## Intro
* The aws-s3-synch is a nodejs wrapper which is great for synching local folder/files to s3 bucket folder and vice versa.
* Major use cases include automation of deployment of static websites or uploading local folder(s) to Amazon s3. 
* Facilitates simulation of actions (without actually performing) by tweaking certain parameters.



## Installation
* [Install and configure s3cmd](http://s3tools.org) or brew install s3cmd
* `npm install aws-s3-synch`

## Usage

**synchToS3**
```js
//include respective libraries
var awsSynch = require("aws-s3-synch");
var path = require("path");

awsSynch.synchToS3({
	// [Required] source directory path
	source: path.join(__dirname),  // --> this one will synch from current working directory

	// [Required] Destination path including both bucket and folder information
	destination: "s3://<BUCKET_NAME>/folder1/folder2/",   				 

	// [Required] true means simulate, false means perform respective action in bucket
	test: true,																				 

	// [Required] delete destination objects with no corresponding file.	
	deleteRemoved: true,															 

	// [Required] files.exclude will contain files that are not supposed to be synched.	
	excludeFile: path.join(__dirname, "files.exclude") 

	//[optional pair] specify the amazon access key and secret
	//If sent as env variable, then these will be overriden
	//if neiher sent as env varibale nor specified in params then will read from default .s3cfg file
	AWS_ACCESS_KEY_ID: "AWS_ACCESS_KEY_ID",
	AWS_SECRET_ACCESS_KEY: "AWS_SECRET_ACCESS_KEY"

});

```

**synchFromS3**
```js

awsSynch.synchFromS3({

	// [Required] Source directory or file path on AWS
	source: `s3://<BUCKET_NAME>/<FULL_PATH_TO_FOLDER_OR_OBJECT>`,

	// [Required] Destination directory path on target machine.
	destination: path.join(__dirname), // this one will synch in current working directory

	// [Required] Skip if respective file already exists in destination directory
	skipExisting: true,

	// [Required] For an operation, it takes precedence on skipExisting
	force: false,

	// [Required] true means simulate, false means perform respective action in bucket
	test: false,


	// [Optional, Default: false] if download fails due to slow internet or somehow, use continue: true to resume
	continue: false

	//[optional pair] specify the amazon access key and secret
	//If sent as env variable, then these will be overriden
	//if neiher sent as env varibale nor specified in params then will read from default .s3cfg file
	AWS_ACCESS_KEY_ID: "AWS_ACCESS_KEY_ID",
	AWS_SECRET_ACCESS_KEY: "AWS_SECRET_ACCESS_KEY"
});


```

### Example content of files.exclude

```
.DS_Store
*.gz
```

**Note**: Its not supposed to work in browser. Not a client side library.
