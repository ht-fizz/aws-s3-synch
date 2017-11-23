## Intro
* The aws-s3-synch is a nodejs wrapper which is great for Synching local folder to s3 bucket folder. 
* Major use cases include automation of deploying static websites or uploading local folder(s) to Amazon s3.
* Facilitates simulation of actions (without actually performing) by tweaking certain parameters.



## Installation
* [Install and configure s3cmd](http://s3tools.org)
* `npm install aws-s3-synch`

## Usage

```js
//include library
var awsSynch = require("aws-s3-synch");
var path = require("path");

awsSynch.synchToS3({
	//source directory path
	source: path.join(__dirname, process.env.SOURCE),  

	//Destination path including both bucket and folder information
	destination: "s3://<BUCKET_NAME>/folder1/folder2/",   				 

	//true means simulate, false means perform respective action in bucket
	test: true,																				 

	//delete destination objects with no corresponding file.	
	deleteRemoved: true,															 

	//files.exclude will contain files that are not supposed to be synched.	
	excludeFile: path.join(__dirname, "files.exclude") 

});

```

### Example content of files.exclude

```
.DS_Store
*.gz
```

**Note**: Its not supposed to work in browser. Not a client side library.
