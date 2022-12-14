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
 * @param {String} item the id of Canvas Element
 * @returns {HTMLCanvasElement | undefined} the CanvasObject
 */
function getCanvas(item) {
    var el;
    if (_isDomSupported()) {
        var tmp = document.getElementById(item);
        if (tmp && tmp.nodeName === "CANVAS") el = tmp;
    }
    // @ts-ignore
    return el;
}

class Chart {
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