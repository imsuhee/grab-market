import { useParams } from "react-router-dom";
import axios from "axios"
import { useEffect, useState } from "react";
import './index.css'
import {API_URL} from "../config/constants"
import dayjs from "dayjs";
import {Button, message} from 'antd';

function ProductPage(){
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const getProduct = () => { //
        axios
    .get(
        `${API_URL}/products/${id}`
    )
    .then(function(result){
        console.log(result.data)
        setProduct(result.data.product);
        
    })
    .catch(function(error){
        console.error(error);
    });
    }

    useEffect(function(){
   /* axios 상품정보를 받아로는 로직
    .get(
        `${API_URL}/products/${id}`
    )
    .then(function(result){
        console.log(result.data)
        setProduct(result.data.product);
        
    })
    .catch(function(error){
        console.error(error);
    }); 이렇게도 사용 가능 하지만 getProduct 함수 안에 넣어줘서 사용가능 */

    getProduct();
    },[])

    if(product == null){
        return <h1>상품 정보를 받고 있습니다.</h1>
    }
    

    const onClickPurchase = () => { //재빨리 결제 버튼 클릭 시 API_URL 경로에 purchase id 구매 로직 이동
        axios.post(`${API_URL}/purchase/${id}`)
        .then((result)=> {
            message.info('구매가 완료되었습니다.'); //버튼 클릭 시 바로 구매 확정 됨 db에 soldout 값 1로 변환
            getProduct();
        }).catch((error)=> { //에러 발생 시 출력
            message.error(`'에러가 발생했습니다.'${error.message}`)
        })
    }

    //로컬호스트 쪽에 저장된 이미지를 불러온다
    return(
        <div>
            <div id ="image-box">
                <img src={`${API_URL}/${product.imageUrl}`} /> 
            </div>
            <div id ="profile-box">
            <img src="/images/icons/avatar.png" />
            <span>{product.seller}</span>
            </div>
            <div id="contents-box">
                <div id="name">{product.name}</div>
                <div id="price">{product.price}원</div>
                <div id ="createdAt">
                {dayjs(product.createdAt).format('YYYY년 MM월 DD일')} 
                </div>
                <Button id="purchase-button"
                        size="large"
                        type="primary"
                        danger onClick ={onClickPurchase} // 버튼 클릭 시 위에 onClickPurchase에 post 요청 발생
                                                         //post에서 애러가 없으면 상품정보 getProduct를 다시 불러온다
                        disabled = {product.soldout ===1} // 버튼 클릭 불가 효과 ,product가 soldout 됬을 때 true 리턴,
                                                        //즉 soldout 되면 버튼 클릭이 활성화 되지 않고 false일 때 버튼 클릭 활성화된다.
                >
                 재빨리 구매하기 
                </Button>
                <pre id="description">{product.description}</pre>
            </div>
        </div>
    );
}
export default ProductPage;