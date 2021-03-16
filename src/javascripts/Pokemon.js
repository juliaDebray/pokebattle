export default class Pokemon {
    constructor(data) {
        this.name = data.name;
        this.types = data.types.map((item) => {
            return item.type.name;
        });
        this.level = 1;
        this.lifePoint = data.stats[0].base_stat;
        this.attack = data.stats[1].base_stat;
        this.defense = data.stats[2].base_stat;
        this.specialAttack = data.stats[3].base_stat;
        this.specialDefense = data.stats[4].base_stat;
    }
}
