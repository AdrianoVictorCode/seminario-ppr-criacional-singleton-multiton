### Motivação:
Imagine um sistema de gerenciamento de abrigos para gatos em que diferentes módulos da aplicação (por exemplo, interface gráfica, cadastro, relatórios) possam tentar criar ou acessar um abrigo de gatos. Se cada módulo criasse sua própria instância do abrigo, haveria problemas como:

Inconsistência nos dados: Os gatos registrados em um abrigo não seriam visíveis em outro, causando informações conflitantes.
Dificuldade de manutenção: O gerenciamento de múltiplas instâncias complicaria a centralização das operações e a atualização dos dados.
Solução com o Singleton:
Utilizando o padrão Singleton, garantimos que apenas uma instância de CatShelter seja criada durante o ciclo de vida da aplicação. Assim, independentemente de quantas vezes o construtor for chamado, todos os módulos acessarão a mesma instância, centralizando o gerenciamento dos gatos. Dessa forma, se um gato é adicionado pelo módulo A, o módulo B também o verá, pois ambos operam sobre o mesmo objeto.


  
### Estrutura

@startuml
title Singleton Pattern - CatShelter

class CatShelter {
  - static instance: CatShelter
  - cats: Array
  + constructor()
  + addCat(name: String, breed: String): void
  + listCats(): Array
}

note right of CatShelter::instance
  Armazena a única instância de CatShelter.
  Se uma nova instância for solicitada,
  retorna a mesma instância.
end note

class Client {
  + main(): void
}

Client --> CatShelter : "usa"
@enduml


### Participantes

- Singleton (CatShelter): Papel: Garante que apenas uma única instância do abrigo seja criada e utilizada por toda a aplicação. Responsabilidade: Centralizar a gestão dos gatos, permitindo que qualquer adição ou consulta seja feita na mesma instância, evitando inconsistências.

- Client: Papel: São os módulos ou componentes da aplicação que necessitam interagir com o abrigo de gatos.
Responsabilidade: Utilizar a interface pública de CatShelter (métodos addCat e listCats) sem se preocupar com a criação ou gerenciamento da instância




## Exemplo:

```js 

class CatShelter {
    constructor() {
        if (CatShelter.instance) {
            return CatShelter.instance;
        }

        this.cats = [];
        CatShelter.instance = this;
    }

    addCat(name, breed) {
        this.cats.push({ name, breed });
    }

    listCats() {
        return this.cats;
    }
}

// Testando o Singleton
const shelter1 = new CatShelter();
shelter1.addCat("Mia", "Siamese");
shelter1.addCat("Tom", "Persian");

const shelter2 = new CatShelter(); // Retorna a mesma instância de shelter1
shelter2.addCat("Luna", "Maine Coon");

console.log(shelter1.listCats()); // Mostra todos os gatos, pois é a mesma instância
console.log(shelter1 === shelter2); // true

```
### Referência

K19. Design Patterns em Java. TREINAMENTOS, 5 de janeiro de 2012. Disponível em: http://www.k19.com.br. Acesso em: 18/02/2025.

& Implementado por: Adriano Victor e Pedro Victor Hipolito