import {Button, Divider, Form, Input, InputNumber, Upload, message} from 'antd';
import { useState } from 'react';
import "./index.css";
import {API_URL} from "../config/constants"
import axios from 'axios';
import {useHistory} from "react-router-dom"

function UploadPage(){
     const [imageUrl, setImageUrl] = useState(null);
     const history = useHistory();
     const onSubmit = (values) => {
          axios.post(`${API_URL}/products`,{
               name : values.name,
               description : values.description,
               seller : values.seller,
               price : parseInt(values.price),
               imageUrl : imageUrl
          }).then((result)=>{
               console.log(result);
               history.replace('/')//이전 페이지가 대체 된다.
          }).catch((error)=>{
            console.log(error);
            message.error(`에러가 발생했습니다. ${error.message}`)
           });
     };
     const onChangeImage = (info) =>{ //콜백 인자
          if(info.file.status === 'uploading'){//업로드 상태에 따라 분기처리
               return;
          }
          if(info.file.status === 'done'){//완료가 되면 
               const response = info.file.response;
               const imageUrl = response.imageUrl; //imageUr 저장해야 하니깐 위쪽에 useState 사용
               setImageUrl(imageUrl); // 로직 순서가 이미지 업로드 시 onChange 불리고 onChangeImage가 불리면서 info(콜백인자)를 이용해서 setImageUrl(status)를 업데이트 해준다.
          }
     }

     return (
      <div id ="upload-container">
           <Form name ="상품 업로드" onFinish={onSubmit}>
             <Form.Item 
             name="upload" 
             label={<div className="upload-label">상품 사진</div>}
             >
               <Upload 
               name='image'
               action={`${API_URL}/image`}
               listType="picture"
               showUploadList={false}
               onChange={onChangeImage}
               >
                {imageUrl ? (//imageUr 있으면 아래 img src 경로 보여줌
                <img id="upload-img" src={`${API_URL}/${imageUrl}`}/>
                ) : (//없으면 아래 내용을 보여줌
                     <div id = "upload-img-placeholder">
                     <img src ="/images/icons/camera.png" />
                     <span>이미지를 업로드 해주세요</span>
                   </div>
                 )}

              
               </Upload>
             </Form.Item>
             <Divider />
             <Form.Item label={<div
             className="upload-label"
             
             >판매자 명</div>}
             name="seller"
             rules={[{required : true, message : '판매자 이름을 입력해주세요'}]}
             >
                  <Input className="upload-name" size="large" placeholder="이름을 입력해주세요."/>
             </Form.Item>
            <Divider />
            <Form.Item
              name ="name"
              label={<div className="upload-label">상품 이름</div>}
              rules={[{required : true, mwssage : '상품 이름을 입력해주세요.'}]}
            >
            <Input className="upload-name" size="large" placeholder="상품 이름을 입력해주세요" />
            </Form.Item>
            <Divider />
            <Form.Item
               name="price"
               label={<div className="upload-label">상품 가격</div>}
               rules={[{required : true, message : "상품 가격을 입력해주세요."}]}>
                <InputNumber defaultValue={0}
                className ="upload-price" 
                size="large" />
               </Form.Item>
            <Divider />
            <Form.Item
               name="description"
               label={<div className="upload-label">상품 소개</div>}
               rules={[{required : true, message : "상품 소개를 입력해주세요."}]}>
               <Input.TextArea 
               size="large" 
               id="product-description" 
               showCount maxLength={300}
               placeholder="상품 소개를 적어주세요"/>
            </Form.Item>
            <Form.Item>
                 <Button id ="submit-button" size="large" htmlType="submit" >
                    문제 등록하기
                 </Button>
            </Form.Item>

           </Form>
      </div>
     );

}

export default UploadPage;