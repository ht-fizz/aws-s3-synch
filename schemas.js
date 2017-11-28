var Joi = require("joi");


var synchToS3 = Joi.object().keys({
	source: Joi.string().required(),
	destination: Joi.string().required(),
	test: Joi.boolean().required(),
	deleteRemoved: Joi.boolean().required(),
	excludeFile: Joi.string().required()
});

var synchFromS3 = Joi.object().keys({
	source: Joi.string().required(),
	destination: Joi.string().required(),
	test: Joi.boolean().required(),
	// deleteRemoved: Joi.boolean().required(),
	skipExisting: Joi.boolean().required(),
	force: Joi.boolean().required(),

	continue: Joi.boolean()
});

module.exports = {
	synchToS3: synchToS3,
	synchFromS3: synchFromS3
}