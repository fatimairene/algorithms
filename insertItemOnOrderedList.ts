  interface Item {
    id: number,
    order: number;
    data: string;
}

/*function reorderList(items: Item[], itemUpdated: Item, newOrder: number): Item[] {
    // Step 1: Find the index of the item to be moved using its id
    const targetItemIndex = items.findIndex(item => item.id === itemUpdated.id);

    if (targetItemIndex === -1) {
        throw new Error("Item not found in the list");
    }

    // Step 2: Remove the item from its current position
    const itemToMove = items.splice(targetItemIndex, 1)[0];

    // Step 3: Set the new order for the item to be moved
    itemToMove.order = newOrder;

    // Step 4: Insert the item at the correct position in the list
    items.splice(newOrder - 1, 0, itemToMove);

    // Step 5: Reassign orders for all items in the list to maintain sequential order
    items.forEach((item, index) => {
        item.order = index + 1;
    });

    return items;
}*/

function reorderList(items: Item[], itemUpdated: Item, newOrder: number): Item[] {
    // Step 1: Find the index of the item to be moved using its id
    const targetItemIndex = items.findIndex(item => item.id === itemUpdated.id);

    if (targetItemIndex === -1) {
        throw new Error("Item not found in the list");
    }

    // Step 2: Remove the item from its current position
    const itemToMove = items.splice(targetItemIndex, 1)[0];
    
    // Temporarily set itemToMove's order to avoid conflicts during reordering
    itemToMove.order = -1;

    // Step 3: Adjust the order of the items between the old and new positions
    if (itemToMove.order < newOrder) {
        // Moving item down the list, so move items between old and new order up
        items.forEach(item => {
            if (item.order > itemUpdated.order && item.order <= newOrder) {
                item.order -= 1;
            }
        });
    } else {
        // Moving item up the list, so move items between new and old order down
        items.forEach(item => {
            if (item.order < itemUpdated.order && item.order >= newOrder) {
                item.order += 1;
            }
        });
    }

    // Step 4: Insert the item back with the new order
    itemToMove.order = newOrder;
    items.push(itemToMove);

    // Step 5: Sort items by their order to maintain list integrity
    items.sort((a, b) => a.order - b.order);

    return items;
}

const initData : Item[] =[{id:8, order:1, data:"leche"}, {id: 10,order:2, data:"cacao"}, {id:15, order:3, data:"azucar"}, {id:4, order:4, data:"avellanas"}]

const itemUpdated: Item = initData[0];

console.log('Init data: ', initData);

const reorderedItems = reorderList(initData, itemUpdated, 3);

console.log('REORDER RES: ', reorderedItems);

