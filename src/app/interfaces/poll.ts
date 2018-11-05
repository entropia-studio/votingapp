export interface Poll {
    _id?: string;
    title: string;
    user: Array<string>;
    items: Array<Item>;    
}

interface Item {
    name: string;
    votes: Array<string>;
}
