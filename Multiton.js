class ConfigManager {
    static instances = {}; 

    constructor(moduleName) {
        if (ConfigManager.instances[moduleName]) {
            return ConfigManager.instances[moduleName];
        }

        this.moduleName = moduleName;
        this.settings = {}; 

        ConfigManager.instances[moduleName] = this;
    }

    setConfig(key, value) {
        this.settings[key] = value;
    }

    getConfig(key) {
        return this.settings[key] || null;
    }
}

const dbConfig = new ConfigManager("database");
dbConfig.setConfig("host", "localhost");
dbConfig.setConfig("port", 5432);

const uiConfig = new ConfigManager("ui");
uiConfig.setConfig("theme", "dark");
uiConfig.setConfig("language", "en");

const authConfig = new ConfigManager("auth");
authConfig.setConfig("tokenExpiration", "1h");

const dbConfigAgain = new ConfigManager("database");
console.log(dbConfigAgain.getConfig("host")); 
console.log(dbConfigAgain === dbConfig); 

const uiConfigAgain = new ConfigManager("ui");
console.log(uiConfigAgain.getConfig("theme"));

console.log(ConfigManager.instances); 
