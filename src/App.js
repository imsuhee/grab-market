import './App.css';
import MainPageComponent from './main';
import {Switch, Route} from 'react-router-dom';
import UploadPage from './upload';
import ProductPage from './product';


function App() {/*함수로 구성, ui요소를 리턴 해야 함*/ 
    return (
    <div>
        <Switch>
            <Route exact={true} path="/">
            <MainPageComponent />;
            </Route>
            <Route exact={true} path ="/product/:id">
                <ProductPage />
            </Route>
            <Route exact={true} path = "/upload" >
                <UploadPage />
            </Route>
        </Switch>
    </div>  
    );


};
export default App;
