import React from 'react'; 
import './Loading.scss'; 

function Loading(){
    return (
        <div className="ui three column stackable grid">
            <div className="column">
                <div className="ui raised segment">
                <div className="ui placeholder">
                    <div className="image header">
                    <div className="line"></div>
                    <div className="line"></div>
                    </div>
                    <div className="paragraph">
                    <div className="medium line"></div>
                    <div className="short line"></div>
                    </div>
                </div>
                </div>
            </div>
            <div className="column">
                <div className="ui raised segment">
                <div className="ui placeholder">
                    <div className="image header">
                    <div className="line"></div>
                    <div className="line"></div>
                    </div>
                    <div className="paragraph">
                    <div className="medium line"></div>
                    <div className="short line"></div>
                    </div>
                </div>
                </div>
            </div>
            <div className="column">
                <div className="ui raised segment">
                <div className="ui placeholder">
                    <div className="image header">
                    <div className="line"></div>
                    <div className="line"></div>
                    </div>
                    <div className="paragraph">
                    <div className="medium line"></div>
                    <div className="short line"></div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Loading); 