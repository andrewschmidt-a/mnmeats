import {type Cut, type CutMap} from './meat.types'

let frontQuarterCuts: Cut[] = [
    {
        id: "ribeye",
        quantityLow: 14,
        quantityHigh: 18,
        label: "Ribeye Steaks",
        organMeat: false
    },
    {
        id: "chuck",
        quantityLow: 7,
        quantityHigh: 10,
        label: "Chuck Roasts",
        organMeat: false
    },
    {
        id: "armroast",
        quantityLow: 3,
        quantityHigh: 3,
        label: "Arm Roasts",
        organMeat: false
    },
    {
        id: "shortribs",
        label: "Beef Short Ribs",
        organMeat: false
    },
    {
        id: "brisket",
        label: "Brisket",
        organMeat: false
    },
    {
        id: "stewmeat",
        quantityHigh: 4,
        quantityLow: 3,
        label: "lbs Stew Meat",
        organMeat: false
    },
    {
        id: "soupbones",
        label: "Soup Bones",
        organMeat: true
    },
    {
        id: "heart",
        label: "Heart",
        organMeat: true
    },
    {
        id: "tongue",
        label: "Tongue",
        organMeat: true
    },
    {
        id: "groundbeef",
        quantityLow: 30,
        quantityHigh: 40,
        label: "lbs Ground Beef",
        organMeat: false
    }
];

let hindquarterCuts: Cut[] = [
    {
        id: "tbone",
        quantityLow: 14,
        quantityHigh: 18,
        label: "T-Bone Steaks",
        organMeat: false
    },
    {
        id: "porterhouse",
        quantityLow: 2,
        quantityHigh: 4,
        label: "Porterhouse Steaks",
        organMeat: false
    },
    {
        id: "sirloin",
        quantityLow: 6,
        quantityHigh: 8,
        label: "Sirloin Steaks",
        organMeat: false
    },
    {
        id: "rump",
        quantityLow: 2,
        quantityHigh: 2,
        label: "Rump Roasts",
        organMeat: false
    },
    {
        id: "roundsteaks",
        quantityLow: 8,
        quantityHigh: 10,
        label: "Round Steaks",
        organMeat: false
    },
    {
        id: "soupbones",
        label: "Soup Bones",
        organMeat: true
    },
    {
        id: "stewmeat",
        quantityHigh: 4,
        quantityLow: 3,
        label: "lbs Stew Meat",
        organMeat: false
    },
    {
        id: "beefliver",
        label: "Liver",
        organMeat: true
    },
    {
        id: "beeftail",
        label: "Tail",
        organMeat: true
    },
    {
        id: "groundbeef",
        quantityLow: 30,
        quantityHigh: 40,
        label: "lbs Ground Beef",
        organMeat: false
    },
];

let combineCuts = (cuts: Cut[]) => {
    let newCuts: CutMap = {}

    cuts.forEach(cut => {
        if(Object.keys(newCuts).includes(cut.id))
        {
            if(cut.quantityHigh && cut.quantityLow)
            {
                newCuts[cut.id].quantityHigh = (newCuts[cut.id].quantityHigh??0)+(cut.quantityHigh??0);
                newCuts[cut.id].quantityLow = (newCuts[cut.id].quantityLow??0)+(cut.quantityLow??0);
            }
        }else{
           newCuts[cut.id] = cut;
        }
    });
    
    return Object.values(newCuts)
}

export default [
    {
        id: "frontquarter",
        label: "Front quarter",
        cuts: frontQuarterCuts,
        price: 4,
        weightLow: 175,
        weightHigh: 200,
        freezerSpace: "5-7 cubic feet"
    },
    {
        id: 'hindquarter',
        label: "Hind quarter",
        cuts: hindquarterCuts,
        price: 4,
        weightLow: 175,
        weightHigh: 200,
        freezerSpace: "5-7 cubic feet"
    },
    {
        id: 'halfbeef',
        label: "Half beef",
        cuts: combineCuts([...frontQuarterCuts, ...hindquarterCuts]),
        price: 4,
        weightLow: 350,
        weightHigh: 400,
        freezerSpace: "10-14 cubic feet"
    },
    {
        id: 'wholebeef',
        label: "Whole beef",
        cuts: combineCuts([...structuredClone(frontQuarterCuts), ...structuredClone(hindquarterCuts), ...structuredClone(frontQuarterCuts), ...structuredClone(hindquarterCuts)]),
        weightLow: 700,
        price: 4,
        weightHigh: 800,
        freezerSpace: "20-28 cubic feet"
    }
]