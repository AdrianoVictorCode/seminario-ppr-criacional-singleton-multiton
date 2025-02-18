/*
Em um sistema grande, diferentes módulos (exemplo: banco de dados, interface gráfica, autenticação) 
podem ter suas próprias configurações. O Multiton permite que cada módulo tenha uma única instância 
de configuração, evitando recriação desnecessária e garantindo que tenha uma consistência bacana.
*/

class ConfigManager {
    static instances = {}; // Armazena instâncias únicas para cada módulo

    constructor(moduleName) {
        if (ConfigManager.instances[moduleName]) {
            return ConfigManager.instances[moduleName];
        }

        this.moduleName = moduleName;
        this.settings = {}; // Armazena as configurações do módulo

        ConfigManager.instances[moduleName] = this;
    }

    setConfig(key, value) {
        this.settings[key] = value;
    }

    getConfig(key) {
        return this.settings[key] || null;
    }
}

// Criando configurações para diferentes módulos
const dbConfig = new ConfigManager("database");
dbConfig.setConfig("host", "localhost");
dbConfig.setConfig("port", 5432);

const uiConfig = new ConfigManager("ui");
uiConfig.setConfig("theme", "dark");
uiConfig.setConfig("language", "en");

const authConfig = new ConfigManager("auth");
authConfig.setConfig("tokenExpiration", "1h");

// Recuperando a mesma instância para "database"
const dbConfigAgain = new ConfigManager("database");
console.log(dbConfigAgain.getConfig("host")); // "localhost"
console.log(dbConfigAgain === dbConfig); // true (mesma instância)

// Recuperando a mesma instância para "ui"
const uiConfigAgain = new ConfigManager("ui");
console.log(uiConfigAgain.getConfig("theme")); // "dark"

console.log(ConfigManager.instances); // Exibe todas as instâncias gerenciadas pelo Multiton
