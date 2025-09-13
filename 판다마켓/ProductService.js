const base_url =  'https://panda-market-api-crud.vercel.app/';

const apiClient = axios.create({
    baseURL: base_url
});

const getProductList = async (params) => {
    try{ 
        const response = await apiClient.get(`/products`,{params});
        return response.data;
    } catch (error){
        console.error(` 상품목록 조회 실패`, error.response ? error.response.data : error.message);
        throw error;
    }
};

const getProduct = async (productId) => {
    try{
        const response = await apiClient.get(`/products/${productId}`);
        return response.data;
    } catch(error){
        console.error(` 상풍(id: ${productId}) 조회실패`, error.response ? error.response.data : error.message);
        throw error
    }
};

const createProduct = async (productData) => {
    try {
       const response = await apiClient.post('/products', productData);
        return response.data;
    } catch (error) {
        console.error(' 상품 생성 실패', error.response ? error.response.data : error.message);
        throw error;
    }
};

const patchProduct = async (productId, updateData) => {
    console.log(`상품(id: ${productId}) 수정을 시작합니다.`, updateData);
    try {
        const response = await apiClient.patch(`/products/${productId}`, updateData);
        return response.data;
    } catch (error) {
        console.error(`상품(id: ${productId}) 수정 실패`, error.response ? error.response.data : error.message);
        throw error;
    }
};
const deleteProduct = async (productId) => {
    console.log(`상품(id: ${productId}) 삭제를 시작합니다.`);
    try {
        const response = await apiClient.delete(`/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error(` 상품(id: ${productId}) 삭제 실패`, error.response ? error.response.data : error.message);
        throw error;
    }
};

export { getProduct, getProductList, createProduct, patchProduct, deleteProduct};
