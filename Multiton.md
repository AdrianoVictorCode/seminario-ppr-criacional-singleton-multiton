

### Motivação:
Em um sistema grande, diferentes módulos (como banco de dados, interface gráfica e autenticação) possuem suas próprias configurações. Se cada módulo criasse múltiplas instâncias de gerenciadores de configuração, isso poderia levar a:

- Inconsistência: Configurações conflitantes ou divergentes para o mesmo módulo.
- Recriação desnecessária: Uso excessivo de memória e processamento por criar objetos repetidamente.
- Dificuldade de manutenção: Dificuldade em centralizar e gerenciar as configurações de cada módulo.
Solução com o Multiton:
Utilizando o padrão Multiton, garantimos que para cada módulo exista apenas uma única instância de ConfigManager. Essa instância é identificada pela chave (neste caso, o nome do módulo) e, quando uma nova solicitação é feita para um módulo já existente, a mesma instância é retornada. Assim, as configurações permanecem consistentes e a criação de objetos é otimizada.
  
### Estrutura

@startuml
title Multiton Pattern - ConfigManager

class ConfigManager {
  - moduleName: String
  - settings: Map<String, Object>
  - static instances: Map<String, ConfigManager>
  + constructor(moduleName: String)
  + setConfig(key: String, value: Object): void
  + getConfig(key: String): Object
}

note right of ConfigManager::instances
  Armazena as instâncias únicas
  para cada módulo (ex: "database", "ui", "auth")
end note

@enduml



### Participantes

- Multiton (ConfigManager):
Papel: Atua como o gerenciador central que assegura que exista somente uma instância de configuração para cada módulo.
Responsabilidade: Armazenar, gerenciar e fornecer acesso às instâncias únicas identificadas por uma chave (nome do módulo).




- Concrete Instance (Instância de ConfigManager para um módulo específico):Papel: Representa a configuração concreta de um módulo específico, como "database", "ui" ou "auth".Responsabilidade: Guardar os parâmetros de configuração (ex.: host, port, theme, anguage, etc.) e garantir que sejam reutilizados sempre que esse módulo for referenciado.

- Client:
Papel: São os diferentes módulos da aplicação que solicitam a instância do ConfigManager para gerenciar suas configurações.
Responsabilidade: Utilizar os métodos setConfig e getConfig para configurar e acessar os parâmetros necessários, sem se preocupar com a criação de novas instâncias.



## Exemplo:

```js 
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

```
### Referência

K19. Design Patterns em Java. TREINAMENTOS, 5 de janeiro de 2012. Disponível em: http://www.k19.com.br. Acesso em: 18/02/2025.

& Implementado por: Adriano Victor e Pedro Victor Hipolito