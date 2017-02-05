/**
 * Figure out how long it takes for a method to execute.
 *
 * @param {Function} method to test
 * @param {number} iterations number of executions.
 * @param {Array} args to pass in.
 * @param {T} context the context to call the method in.
 * @return {number} the time it took, in milliseconds to execute.
 */
var bench = function (method, iterations, args, context) {
    'use strict';
    var time = 0;
    var timer = function (action) {
        var d = Date.now();
        if (time < 1 || action === 'start') {
            time = d;
            return 0;
        } else if (action === 'stop') {
            var t = d - time;
            time = 0;
            return t;
        } else {
            return d - time;
        }
    };

    var result;
    var i = 0;
    timer('start');
    while (i < iterations) {
        result = method.apply(context, args);
        i++;
    }

    var time = timer('stop');
    var timeformat =  "<strong>" + time + "</strong> milliseconds.";
    if (result === null) {
        timeformat = "";
    }
    var returnObject = {
        time: time,
        timeformat: timeformat,
        result: result
    }

    // if ( typeof console === "object") {
    //     console.log("Mean execution time was: ", execTime / iterations);
    //     console.log("Sum execution time was: ", execTime, "milliseconds");
    //     console.log("Result of the method call was:", result[0]);
    // }

    return returnObject;
};