import React from 'react'
import { Container } from './style'
import { CSSTransition } from 'react-transition-group'
import  Header  from './../../baseUI/header/index';
function Album(props) {
    const [showState, setShowState] = React.useState(true)
    const handleBack = () => {
        setShowState (false);
    };
    return (
        <CSSTransition
            in={showState}
            timeout={200}
            classNames="fly"
            unmountOnExit
            appear={true} 
            onExited={props.history.goBack}
        >
            <Container>
                <Header title={"返回"} handleClick={handleBack}></Header>
            </Container>

        </CSSTransition>
    )
}
export default React.memo(Album)