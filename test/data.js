var path = require("path");
var __ = require("lodash");

var synchToS3 = (function() {
	var params = {
		source: path.join(__dirname),
		destination: "s3://test-bucket/folder1/folder2/",   				 
		test: true,																				 
		deleteRemoved: true,
		excludeFile: path.join(__dirname, "../files.exclude") 
	};

	return {
		invalid: {
			source: {
				missing: () => { return __.omit(params, "source") },
				boolean: () => { return Object.assign({}, params, {source: true }) }
			},
			destination: {
				missing: () => { return __.omit(params, "destination") },
				boolean: () => { return Object.assign({}, params, {destination: true }) }
			},
			test: {
				missing: () => { return __.omit(params, "test") }
			},
			deleteRemoved: {
				missing: () => { return __.omit(params, "deleteRemoved") }
			},
			excludeFile: {
				missing: () => { return __.omit(params, "excludeFile") }
			}
		},
		valid: {
			case1: () => { return Object.assign({}, params, { destination: process.env.BUCKET_NAME }) }
		}
	};

}());

var synchFromS3 = (function() {
	var params = {
		source: "s3://test-bucket/folder1/folder2/",
		destination: path.join(__dirname),
		skipExisting: true,
		force: true,
		test: true,
		continue: false
	};

	return {
		invalid: {
			source: {
				missing: () => { return __.omit(params, "source") },
				boolean: () => { return Object.assign({}, params, {source: true }) }
			},
			destination: {
				missing: () => { return __.omit(params, "destination") },
				boolean: () => { return Object.assign({}, params, {destination: true }) }
			},
			skipExisting: {
				missing: () => { return __.omit(params, "skipExisting") }
			},
			force: {
				missing: () => { return __.omit(params, "force") }
			},
			test: {
				missing: () => { return __.omit(params, "test") }
			}
		},
		valid: {
			case1: () => { return Object.assign({}, params, { source: process.env.BUCKET_NAME }) }
		}
	};
}());

module.exports = {
	synchToS3: synchToS3,
	synchFromS3: synchFromS3
}