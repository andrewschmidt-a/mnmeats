export type Cut = {
    id: string,
    quantityLow?: number,
    quantityHigh?: number,
    label: string,
    organMeat: boolean
}
export type CutMap = {
    [key: string]: Cut;
};

export type CutPrice = {
    unit?: string | null,
    price: number,
    link: string,
    weight: number
}
export type CutPriceMap = {
    [key: string]: CutPrice;    
}