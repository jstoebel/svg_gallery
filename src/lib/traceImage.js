"use strict";
exports.__esModule = true;
var node_vibrant_1 = require("node-vibrant");
var potrace_1 = require("potrace");
var svgo_1 = require("svgo");
var Potrace = potrace_1["default"].Potrace;
var encodeSvgDataUri = function (svg) {
    var uriPayload = encodeURIComponent(svg)
        .replace(/%0A/g, '')
        .replace(/%20/g, ' ')
        .replace(/%3D/g, '=')
        .replace(/%3A/g, ':')
        .replace(/%2F/g, '/')
        // tslint:disable-next-line:quotemark
        .replace(/%22/g, "'");
    return 'data:image/svg+xml,' + uriPayload;
};
var optimizeSvg = function (svg) {
    return new Promise(function (resolve) {
        var svgo = new svgo_1["default"]({ floatPrecision: 0 });
        svgo.optimize(svg).then(function (optimizedSVG) {
            resolve(optimizedSVG.data);
        });
    });
};
var extractMostProminentColor = function (filePath) {
    var vibrant = new node_vibrant_1["default"](filePath);
    return vibrant.getPalette().then(function (palette) {
        var mostProminentColor = '';
        var highestPopulation = 0;
        var color = '';
        var population = 0;
        Object.keys(palette).forEach(function (key) {
            if (palette[key] === null) {
                return;
            }
            color = palette[key].getHex();
            population = palette[key].getPopulation();
            if (population > highestPopulation) {
                mostProminentColor = color;
                highestPopulation = population;
            }
        });
        return mostProminentColor;
    });
};
;
var traceSvg = function (filePath, traceParams) {
    return new Promise(function (resolve, reject) {
        var trace = new Potrace(traceParams);
        trace.loadImage(filePath, function (error) {
            if (error) {
                reject(error);
            }
            else {
                resolve(trace.getSVG());
            }
        });
    });
};
/**
 * Create SVG outline of an image.
 * @param {string} filePath - the absolute path of the image to trace
 *
 * @returns {Promise} Promise that resolves to the images' SVG
 */
var traceImage = function (filePath) {
    var traceParams = {
        turnPolicy: Potrace.TURNPOLICY_MINORITY,
        turdSize: 100,
        alphaMax: 1,
        optCurve: true,
        optTolerance: 0.2,
        threshold: Potrace.THRESHOLD_AUTO,
        blackOnWhite: true,
        background: Potrace.COLOR_TRANSPARENT
    };
    var color = Potrace.COLOR_AUTO;
    var getFillColor = extractMostProminentColor(filePath);
    return new Promise(function (resolve, reject) {
        getFillColor.then(function (color) {
            traceParams.color = color;
            return traceSvg(filePath, traceParams);
        })
            .then(optimizeSvg)
            .then(encodeSvgDataUri)
            .then(function (encodedSvgDataUri) {
            resolve(encodedSvgDataUri);
        })["catch"](function (error) {
            reject(error);
        });
    });
};
exports["default"] = traceImage;
