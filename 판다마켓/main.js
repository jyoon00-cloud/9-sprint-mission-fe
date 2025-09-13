import{
    getArticle,
    getArticleList,
    createArticle,
    deleteArticle,
    patchArticle
} from './ArticleService.js';

import{ 
    getProductList,
    getProduct,
    createProduct,
    patchProduct,
    deleteProduct
} from './ProductService.js'

const testArticle =() => { //articleService 테스트
    console.log('\n--- articleService 테스트 시작 ---');
    let createdArticleId;
    return getArticleList({ page:1, pageSize:5})
        .then(() => {
            return createArticle({
                title: '제목테스트',
                content: '내용테스트',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/A_Panda_eating.jpg/250px-A_Panda_eating.jpg'
            })
        })
        .then(createdArticle => {
            createdArticleId = createdArticle._id;
            return getArticle(createdArticleId)
        })
        .then(() => {
            return patchArticle(createdArticleId, {
                title: '제목 수정 테스트'
            });
        })
         .then(() => { // 수정된 게시글 정보 확인
            return getArticle(createdArticleId);
        })
        .then(() => {
            return deleteArticle(createdArticleId);
        })
        .then(() => {
            console.log('--- ArticleService 테스트 성공 ---');
        })
        .catch(error => {
            console.error('--- 오류 발생 ---', error);
            throw error;
        });
}

const testProduct = async () => {
    console.log('\n--- ProductService 테스트 시작 ---');
    try {
        await getProductList({ page: 1, pageSize: 5 });

        const newProductData = {
            name: '테스트 상품',
            description: '테스트 상품임',
            price: 20000,
            tags: ['test', 'sample'],
            images: ['https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg']
        };
        const createdProduct = await createProduct(newProductData);
        const createdProductId = createdProduct._id;

        await getProduct(createdProductId);

        await patchProduct(createdProductId, {
            price: 25000,
            description: '상품 테스트 가격 수정'
        });

        await getProduct(createdProductId);

        await deleteProduct(createdProductId);

        console.log('--- ProductService 테스트 성공 ---');

    } catch (error) {
        console.error('--- 오류 발생 ---', error);
    }
};


window.onload = async () => {
    try{
        await testArticle();
        await testProduct();
    } catch (error) {
        console.error(' 테스트가 중단되었습니다. ')
    }
};