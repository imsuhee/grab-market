import React from 'react';

function Time(){
const [time, setTime] = React.useState(0);
console.log('컴포넌트 업데이트');{/* time이 업데이트 될 때마다 계속 호출됨 */}
function update() {
    setTime(time + 1 );
}
return (
    <div>
        <h3>
            {time} 초
            {/* 클릭 시 set Time로 state를 업데이트 해줌 */}
        </h3>
        <button onClick = {update}>1씩 올려주세요</button>
    </div>
);
}

export default Time;