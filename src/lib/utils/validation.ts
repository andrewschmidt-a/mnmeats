export let validationClass = (valid: boolean, type: string = 'input') => {
    if(!valid){
        return `${type}-error`
    }
}