const base_url =  'https://panda-market-api-crud.vercel.app/';

const apiClient = axios.create({
    baseURL: base_url
});

//get 메소드
const getArticleList = (articleId) =>{
    return apiClient.get(`/articles`,{articleId})
        .then(response => {
            return response.data;
        })
        .catch(error=>{
            console.error('글목록 조회 실패',error.response ? error.response.data : error.message);
            throw error;
        })
}

//get 메소드
const getArticle = (articleId) => {
    return apiClient.get(`/articles/${articleId}`)
        .then(response=> {
            return response.data;
        }) 
        .catch(error => {
            console.error('게시글 조회 실패',error.response ? error.response.data : error.message);
            throw error;
        });
};

const createArticle = (articleData) => {
    return apiClient.post(`/articles` , articleData)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('게시글 생성 실패', error.response ? error.response.data : error.message);
            throw error;
        });
};

const patchArticle = (articleId, updateData) => {
    return apiClient.patch(`/articles/${articleId}`,updateData)
        .then(response=>{
            return response.data;
        })
        .catch(error => {
            console.error(`게시글 (id:${articleId} 수정 실패`, error.response ? error.response.data : error.message);
            throw error;
        });
};

const deleteArticle = (articleId) => {
    return apiClient.delete(`/articles/${articleId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(`게시글 (id: ${articleId}) 삭제 실패`, error.response ? error.response.data : error.message);
            throw error; 
        });
};

export { getArticleList,getArticle,createArticle,patchArticle,deleteArticle};
