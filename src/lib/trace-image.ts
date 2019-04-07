import Vibrant from 'node-vibrant';
import potrace from 'potrace';
import SVGO from 'svgo'

const Potrace = potrace.Potrace;

const encodeSvgDataUri = (svg: string) => {
  const uriPayload = encodeURIComponent(svg)
    .replace(/%0A/g, '')
    .replace(/%20/g, ' ')
    .replace(/%3D/g, '=')
    .replace(/%3A/g, ':')
    .replace(/%2F/g, '/')

    // tslint:disable-next-line:quotemark
    .replace(/%22/g, "'");
  return 'data:image/svg+xml,' + uriPayload;
}

const optimizeSvg = (svg: string) => {
  return new Promise(function(resolve) {
    const svgo = new SVGO({ floatPrecision: 0 });
    svgo.optimize(svg).then(function(optimizedSVG) {
      resolve(optimizedSVG.data)
    })
  });
}

const extractMostProminentColor = (filePath: string) => {
  const vibrant = new Vibrant(filePath);

  return vibrant.getPalette().then(function(palette) {
    let mostProminentColor = '';
    let highestPopulation = 0;
    let color = '';
    let population = 0;

    Object.keys(palette).forEach(function(key) {
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
}

interface traceParamsI {
  turnPolicy: string
  turdSize: number,
  alphaMax: number,
  optCurve: boolean,
  optTolerance: number,
  threshold: number,
  blackOnWhite: boolean,
  background: string,
  color?: string
};

const traceSvg = (filePath: string, traceParams: traceParamsI ) => {
  return new Promise((resolve, reject) => {
    const trace = new Potrace(traceParams);

    trace.loadImage(filePath, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(trace.getSVG());
      }
    });
  });
}

/**
 * Create SVG outline of an image.
 * @param {string} filePath - the absolute path of the image to trace
 * 
 * @returns {Promise} Promise that resolves to the images' SVG
 */
const traceImage = (filePath: string) => {
  const traceParams: traceParamsI = {
    turnPolicy:   Potrace.TURNPOLICY_MINORITY,
    turdSize:     100,
    alphaMax:     1,
    optCurve:     true,
    optTolerance: 0.2,
    threshold:    Potrace.THRESHOLD_AUTO,
    blackOnWhite: true,
    background:   Potrace.COLOR_TRANSPARENT
  };

  const color = Potrace.COLOR_AUTO;
  let getFillColor = extractMostProminentColor(filePath);

  return new Promise((resolve, reject) => {
    getFillColor.then(function(color) {
      traceParams.color = color;
      return traceSvg(filePath, traceParams);
    })
    .then(optimizeSvg)
    .then(encodeSvgDataUri)
    .then(function(encodedSvgDataUri) {
      resolve(encodedSvgDataUri)
    })
    .catch(function(error) {
      reject(error)
    });
  })
};

export default traceImage;