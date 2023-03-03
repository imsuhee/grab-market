function Test(props) {/* 변수명이 대문자가 아닐 시 오류가 남!! */
   const {name, age} = props;
    return <div>
        <p>이름은 {name} 이며 {age}살입니다.</p>
        </div>
}
export default Test;