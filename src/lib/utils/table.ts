export let sortByField = (data: any[], sortField: {accessor: string, direction: string})=>{
    let clonedData = [...data]
    if(sortField.accessor != ""){
        clonedData.sort((a, b) => {
            const keyA = sortField.accessor as keyof typeof a;
            const keyB = sortField.accessor as keyof typeof b;
            if (sortField.direction === "asc") {
                return a[keyA] > b[keyB] ? 1 : -1;
            } else if (sortField.direction === "desc") {
                return a[keyA] < b[keyB] ? 1 : -1;
            } else {
                return 0;
            }
        });
    }
    return clonedData;
}