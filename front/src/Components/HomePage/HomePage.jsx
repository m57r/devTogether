import Header from "../Header/Header";
import Main from "../Main/Main";
import Video from "../Video/Video";

import './HomePage.scss'; 

function HomePage(){
    return(
        <>
            <Header/>
            <div className = 'HomePage'>
                <Video/>
                <Main />
            </div>
        </>
       

    )
}

export default HomePage; 