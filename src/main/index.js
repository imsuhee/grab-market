import React from 'react';
import './index.css'
import axios from "axios";
import {Link} from 'react-router-dom'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import {API_URL} from "../config/constants.js"
import { Carousel } from 'antd';


dayjs.extend(relativeTime);

function MainPage(){
    const [products, setProducts] = React.useState([]);
    const [banners, setBanners] = React.useState([]);

    React.useEffect(function() { // 즉시 실행합수
        axios //상품 정보를 받아오는 로직
        .get(`${API_URL}/products`)
        .then(function(result){
            console.log(`result.data.products : ${JSON.stringify(result.data, null ,2)}`)
            const products = result.data.products;
            setProducts(products);

    })
    .catch(function(error) {
     console.error('에러 발생 : ',error);
    });
    
    axios.get(`${API_URL}/banners`).then((result)=> {
        const banners = result.data.banners;
        setBanners(banners);
    }).catch((error)=> {
        console.error("에러발생 : ", error);
    })
    }, []);

    return (//30초 마다 베너 움직임
        <div> 
        <Carousel autoplay autoplaySpeed={3000}>
        {
         banners.map((banner, index) => { 
          return ( //서버에서 베너 이미지를 가져오겠다.
             <Link to={banner.href}>
             <div id="banner"> 
             <img src={`${API_URL}/${banner.imageUrl}`} />
            </div>
            </Link>

             );
            })}
            </Carousel>

            <h1 id="product-headlien">판매되는 상품들</h1>
            <div id="product-list">
                {products.map(function(product, index){
                 return (
                    <div className = "product-card">
                    { //soldout가 1이면 판매가 되었다 -> 블러처리가 된다.
                        product.soldout === 1 && <div className="product-blur"/>
                    }

                        <Link style={{color : "inherit" }}
                        className="product-link" 
                        to ={`/products/${product.id}`}> 
                        <div> 
                        <img className="product-img" src={`${API_URL}/${product.imageUrl}`}/*서버에 있는 이미지를 가져온다*/ />  
                        </div>
                        <div className = "product-contents">
                        <span className="product-name">{product.name}</span>
                        <span className="product-price">{product.price}원</span>
                        
                        <div className="product-footer">
                        <div className="product-seller">
                            <img className="product-avatar" src="images/icons/avatar.png" />
                        <span>{product.seller}</span>
                        </div>
                        <span className="product-date">
                            {dayjs(product.createdAt).fromNow()}</span>
                    </div>
                    </div>
                    </Link>
                    </div>
                        );
                    })}
           
        </div>
        </div>
    );
}
export default MainPage;