import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width:768px;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1reml;
        padding-right: 1rem;
    }
`;

const NewsList = ({ category }) => {
    const [loading , response, error] = usePromise(()=>{
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(
            `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=132ac4ad06874aceac3a10219365e84e`,
        );
    }, [category]);

    // 대기 중일 때
    if (loading) {
        return <NewsListBlock>대기중...</NewsListBlock>;
    }
    // 아직 articles 값이 설정되지 않았을 때
    if (!response) {
        return null;
    }
    if(error){
        return <NewsListBlock>에러 발생!</NewsListBlock>;
    }
    //articles 값이 유효할 때
    const { articles } = response.data;
    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article}/>
                // 데이터를 불러와서 뉴스 데이터 배열을 map 함수를 사용하여 컴포넌트 배열로 변환 할 때
                // map 함수를 사용전 !article 로 현재 값이 null인지 검사해야한다.
                // 이 작업을 하지 않으면, 아직 데이터가 없을때 null에는 map 함수가 없기 때문에 렌더링 과정에서 오류가 발생한다.
            ))}
        </NewsListBlock>
    );
};

export default NewsList;
