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

const shelter1 = new CatShelter();
shelter1.addCat("Mia", "Siamese");
shelter1.addCat("Tom", "Persian");

const shelter2 = new CatShelter(); 
shelter2.addCat("Luna", "Maine Coon");

console.log(shelter1.listCats()); 
console.log(shelter1 === shelter2); 
