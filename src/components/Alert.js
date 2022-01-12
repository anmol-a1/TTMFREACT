import React from 'react'

const Alert = (props) => {
    return (
        props.alert && <div style={{width: "100%",height:"65px",position: "absolute",top:"0",left:"0",zIndex:"80"}}>
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                 {props.alert.msg}.
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    )
}

export default Alert
