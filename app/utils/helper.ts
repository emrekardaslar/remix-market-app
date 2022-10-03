export const getHeaderItems = (data: any, headerItems: any) => {
    let items = headerItems;
    if (data.user) {
        let newItems: { key: any; label: any; }[] = [];
        Object.keys(items).forEach(idx => {
            if (items[idx].key !== "Register" && items[idx].key !== "Login") {
                newItems.push({key: items[idx].key, label: items[idx].label})
            }
        })
        items = newItems;
    }
    else {
        items = headerItems;
    }
    return items;
}