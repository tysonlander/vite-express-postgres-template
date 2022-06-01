const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


// @desc      Get example
// @route     GET /api/v1/examples/:id
// @access    Public
exports.getExample = asyncHandler(async (req, res, next) => {
    // NOTE : req.params.id might need converted to a string or number
    // req.query
    // console.log('looking for example id:'+ req.params.id)
    console.log('hitting line 10')

    const example = {"example": "example 1"}

    if(!example){
        return next(
            new ErrorResponse(`Example not found with id of ${req.params.id}`, 404)
        )
    }

    res.status(200).json({
        success: true,
        data: example,
    });
});

// @desc      Get examples
// @route     GET /api/v1/examples
// @access    Public
exports.getExamples = asyncHandler(async (req, res, next) => {
    console.log('fetching all examples...')

    const examples = [{"example": "example 1"}, {"example": "example 2"}]

    const response = await fetch('https://api.github.com/users/github');
    const data = await response.json();


    res.status(200).json({
        success: true,
        data: data,
    });
});