import products from "@/app/products/page";
import { AddProductProps, EditGameInformationProps, IProduct } from "@/interfaces/IProduct";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchingProducts = async():Promise<IProduct[]> =>{
    try{
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json()
        // console.log(products)
        return products;
    }catch(error){
        console.error("Error fetching products:" , error);
        return[]
    }
}


export const fetchingProductByID = async (id:string):Promise<IProduct> =>{
    try {
        const response = await fetch(`${API_URL}/products/${id}`);
        const productByID = await response.json()
        return productByID;
    } catch (error) {
        throw new Error(`HTTP error! status: ${error}`);
    }
}

export const editProductInformationByID = async (product:EditGameInformationProps): Promise<EditGameInformationProps> =>{
    try {
        const response = await fetch(`${API_URL}/products/${product.id}`, {
            method:"PUT",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(product)
        })


        if (!response.ok) {
            // Intenta capturar el cuerpo de la respuesta de error, si existe.
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        const newGameInfo = await response.json()
        console.log(newGameInfo)
        return newGameInfo;
    } catch (error) {
        console.error("Error updating product:", error);
        throw new Error(
            `Failed to update product: ${
                error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
}

export const addProduct = async (product:AddProductProps): Promise<EditGameInformationProps> =>{

    const formData = new FormData();
    product.images.forEach((image: File) => {
        formData.append('images', image);
    });
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('stock', product.stock.toString());
    
    // // Imprimir el contenido de FormData
    // for (const pair of formData.entries()) {
    //     console.log(pair[0], pair[1]);
    // }
    try {
        const response = await fetch(`${API_URL}/products`, {
            method: "POST",
            body: formData // Pasar FormData directamente
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const newGameInfo = await response.json();
        console.log(newGameInfo);
        return newGameInfo;
    } catch (error) {
        console.error("Error updating product:", error);
        throw new Error(
            `Failed to update product: ${
                error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
}

export const deleteProductByID = async(id:string) =>{
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method:"DELETE"
        })
        const productByID = await response.json()
        return productByID;
    } catch (error) {
        throw new Error(`HTTP error! status: ${error}`);
    }
}