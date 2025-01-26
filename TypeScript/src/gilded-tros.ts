import { Item } from "./item";

enum SpecialItemsName {
	GOOD_WINE = "Good Wine",
	BACKSTAGE_REFACTOR = "Backstage passes for Re:Factor",
	BACKSTAGE_HAXX = "Backstage passes for HAXX",
	B_DAWG_KEYCHAIN = "B-DAWG Keychain",
	LONG_METHODS = "Long Methods",
	UGLY_VARIABLE_NAMES = "Ugly Variable Names",
}

export class GildedTros {
	constructor(public items: Array<Item>) {}

	public updateQuality(): void {
		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if (item.name === SpecialItemsName.GOOD_WINE) {
				this.processGoodWine(item);
			} else if (item.name === SpecialItemsName.BACKSTAGE_HAXX || item.name === SpecialItemsName.BACKSTAGE_REFACTOR) {
				this.processBackstagePass(item);
			} else if (item.name === SpecialItemsName.BACKSTAGE_HAXX || item.name === SpecialItemsName.BACKSTAGE_REFACTOR) {
				this.processSmellyItem(item);
			} else {
				this.processDefaultItem(item);
			}

			// every items sellIn has to update except for legendary items
			if (item.name !== SpecialItemsName.B_DAWG_KEYCHAIN) {
				this.adjustSellIn(item);
			}
		}
	}

	private processGoodWine(item: Item): void {
		this.adjustQuality(item, 1);
	}

	private processBackstagePass(item: Item): void {
		if (item.sellIn <= 0) {
			// Quality drops to 0 after the concert
			item.quality = 0;
		} else if (item.sellIn <= 5) {
			// Increase quality by 3 when 5 days or less remain
			this.adjustQuality(item, 3);
		} else if (item.sellIn <= 10) {
			// Increase quality by 2 when 10 days or less remain
			this.adjustQuality(item, 2);
		} else {
			// Increase quality by 1 otherwise
			this.adjustQuality(item, 1);
		}
	}

	private processSmellyItem(item: Item): void {
		this.adjustQuality(item, -2); // smelly items degrade twice as fast in quality
	}

	private processDefaultItem(item: Item): void {
		this.adjustQuality(item, -1);
	}

	// updates the quality of adjustable items with a min of 0 and a max of 50
	private adjustQuality(item: Item, amount: number): void {
		if (item.sellIn <= 0) {
			// Degrade or increase quality twice as fast if sellIn is 0 or less
			amount *= 2;
		}
		// Ensure quality stays within the bounds of 0 and 50
		item.quality = Math.max(0, Math.min(50, item.quality + amount));
	}

	private adjustSellIn(item: Item): void {
		item.sellIn -= 1;
	}
}
