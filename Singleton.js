/*
Garante um único abrigo de gatos:
Se tentarmos criar outro abrigo, ele retorna o mesmo que já existe.
Gerencia todos os gatos em um só lugar:
Se shelter1 adicionar um gato, shelter2 também verá essa adição.ss
*/

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
