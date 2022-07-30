import Config from "./core.config"
import { _isDomSupported } from "../helpers/helper.dom"
import { uid } from "../helpers/helper.core";

const instances = {};

function getChart(key) {
    const canvas = getCanvas(key.id);
    return Object.values(instances).filter((c) => c.canvas === canvas).pop();
};

/**
 * Get canvas object
 * @param {StringID} item the id of Canvas Element
 * @returns the CanvasObject
 */
function getCanvas(item) {
    if (_isDomSupported() && typeof item === 'string') {
        item = document.getElementById(item);
    }
    return item;
}

class Chart {
    // eslint-disable-next-line max-statements
    constructor(itemID, userConfig) {
        const config = this.config = new Config(userConfig);
        const initialCanvas = getCanvas(itemID);

        if (!initialCanvas) {
            throw new Error(
                'Not found element with id ' + itemID
            )
        }

        const existingChart = getChart(initialCanvas);

        if (existingChart) {
            throw new Error(
                'Canvas is already in use. Chart with ID \'' + existingChart.id + '\'' +
                ' must be destroyed before the canvas with ID \'' + existingChart.canvas.id + '\' can be reused.'
            );
        }
        this.id = uid()

        // Add the chart instance to the global namespace
        instances[this.id] = this;

    }
}
export default Chart;