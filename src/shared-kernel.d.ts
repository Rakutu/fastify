declare global {
    interface Product {
        id: number;
        createAt: number;
        updateAt: number;
        title: string;
        content: string;
        price: number;
        ownerId: number;
    }
}