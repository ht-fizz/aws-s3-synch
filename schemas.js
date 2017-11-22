var Joi = require("joi");


var synchToS3 = Joi.object().keys({
	source: Joi.string().required(),
	destination: Joi.string().required(),
	test: Joi.boolean().required(),
	deleteRemoved: Joi.boolean().required(),
	excludeFile: Joi.string().required()
});

module.exports = {
	synchToS3: synchToS3 
}