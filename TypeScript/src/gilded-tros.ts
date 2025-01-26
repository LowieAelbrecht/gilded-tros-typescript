import { Item } from "./item";

enum SpecialItemsName {
	GOOD_WINE = "Good Wine",
	BACKSTAGE_REFACTOR = "Backstage passes for Re:Factor",
	BACKSTAGE_HAXX = "Backstage passes for HAXX",
	B_DAWG_KEYCHAIN = "B-DAWG Keychain",
}

export class GildedTros {
	constructor(public items: Array<Item>) {}

	public updateQuality(): void {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].name != SpecialItemsName.GOOD_WINE && this.items[i].name != SpecialItemsName.BACKSTAGE_REFACTOR && this.items[i].name != SpecialItemsName.BACKSTAGE_HAXX) {
				if (this.items[i].quality > 0) {
					if (this.items[i].name != SpecialItemsName.B_DAWG_KEYCHAIN) {
						this.items[i].quality = this.items[i].quality - 1;
					}
				}
			} else {
				if (this.items[i].quality < 50) {
					this.items[i].quality = this.items[i].quality + 1;

					if (this.items[i].name == SpecialItemsName.BACKSTAGE_REFACTOR) {
						if (this.items[i].sellIn < 11) {
							if (this.items[i].quality < 50) {
								this.items[i].quality = this.items[i].quality + 1;
							}
						}

						if (this.items[i].sellIn < 6) {
							if (this.items[i].quality < 50) {
								this.items[i].quality = this.items[i].quality + 1;
							}
						}
					}
				}
			}

			if (this.items[i].name != SpecialItemsName.B_DAWG_KEYCHAIN) {
				this.items[i].sellIn = this.items[i].sellIn - 1;
			}

			if (this.items[i].sellIn < 0) {
				if (this.items[i].name != SpecialItemsName.GOOD_WINE) {
					if (this.items[i].name != SpecialItemsName.BACKSTAGE_REFACTOR || this.items[i].name != SpecialItemsName.BACKSTAGE_HAXX) {
						if (this.items[i].quality > 0) {
							if (this.items[i].name != SpecialItemsName.B_DAWG_KEYCHAIN) {
								this.items[i].quality = this.items[i].quality - 1;
							}
						}
					} else {
						this.items[i].quality = this.items[i].quality - this.items[i].quality;
					}
				} else {
					if (this.items[i].quality < 50) {
						this.items[i].quality = this.items[i].quality + 1;
					}
				}
			}
		}
	}
}
