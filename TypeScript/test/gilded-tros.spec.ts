import { Item } from "../src/item";
import { GildedTros, SpecialItemsName } from "../src/gilded-tros";

describe("GildedTrosTest", () => {
	let items: Item[];
	let app: GildedTros;

	beforeEach(() => {
		items = [
			new Item(SpecialItemsName.GOOD_WINE, 10, 20), // Example for Good Wine
			new Item(SpecialItemsName.BACKSTAGE_REFACTOR, 12, 30), // Example for Backstage passes
			new Item(SpecialItemsName.B_DAWG_KEYCHAIN, 5, 80), // Example for Legendary Item (B-DAWG Keychain)
			new Item(SpecialItemsName.DUPLICATE_CODE, 5, 40), // Example for smelly item
			new Item("Regular Item", 5, 10), // Example for regular item
		];

		app = new GildedTros(items);
	});

	it("should increase the quality of Good Wine by 1", () => {
		app.updateQuality();
		const goodWine = items.find((item) => item.name === SpecialItemsName.GOOD_WINE);
		expect(goodWine!.quality).toBe(21);
	});

	it("should increase the quality of Backstage passes by 1", () => {
		app.updateQuality();
		const backstagePass = items.find((item) => item.name === SpecialItemsName.BACKSTAGE_REFACTOR);
		expect(backstagePass!.quality).toBe(31);
	});

	it("should ensure B-DAWG Keychain quality remains 80", () => {
		app.updateQuality();
		const keychain = items.find((item) => item.name === SpecialItemsName.B_DAWG_KEYCHAIN);
		expect(keychain!.quality).toBe(80);
	});

	it("should degrade smelly items by 2", () => {
		app.updateQuality();
		const smellyItem = items.find((item) => item.name === SpecialItemsName.DUPLICATE_CODE);
		expect(smellyItem!.quality).toBe(38);
	});

	it("should degrade regular items by 1", () => {
		app.updateQuality();
		const regularItem = items.find((item) => item.name === "Regular Item");
		expect(regularItem!.quality).toBe(9);
	});

	it("should not allow quality to go below 0", () => {
		items[4].quality = 0;
		app.updateQuality();
		const regularItem = items.find((item) => item.name === "Regular Item");
		expect(regularItem!.quality).toBe(0);
	});

	it("should not allow quality to exceed 50 for non-legendary items", () => {
		items[0].quality = 50;
		app.updateQuality();
		const goodWine = items.find((item) => item.name === SpecialItemsName.GOOD_WINE);
		expect(goodWine!.quality).toBe(50);
	});

	it("should set quality of Backstage passes to 0 after event has passed", () => {
		items[1].sellIn = 0;
		app.updateQuality();
		const backstagePass = items.find((item) => item.name === SpecialItemsName.BACKSTAGE_REFACTOR);
		expect(backstagePass!.quality).toBe(0);
	});

	it("should decrease sellIn by 1 for regular items", () => {
		app.updateQuality();
		const regularItem = items.find((item) => item.name === "Regular Item");
		expect(regularItem!.sellIn).toBe(4);
	});

	it("should handle Good Wine when sellIn is 0 or less", () => {
		items[0].sellIn = 0;
		app.updateQuality();
		const goodWine = items.find((item) => item.name === SpecialItemsName.GOOD_WINE);
		expect(goodWine!.quality).toBe(22);
	});
});
