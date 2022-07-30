/**
 * Initial the data set
 * @param {ConfigDataSet} data the user data set
 * @returns the data set replaced by user
 */

function initData(data) {
    data = data || {};
    data.datasets = data.datasets || [];
    data.labels = data.labels || [];
    return data;
}

/**
 * Initial the config attribute
 * @param {ConfigData} config the user config
 * @returns the default config replaced by user
 */

function initConfig(config) {
    config = config || {};
    config.data = initData(config.data);
    return config;
}

export default class Config {
    constructor(config) {
        this._config = initConfig(config);
    }
}