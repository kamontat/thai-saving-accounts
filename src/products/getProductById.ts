import { PRODUCTS, type ProductId } from "./all";

const getProductById = (id: ProductId) => {
	const product = PRODUCTS[id];
	if (!product) throw new Error(`Product with id ${id} not found`);

	return product;
};
export default getProductById;
