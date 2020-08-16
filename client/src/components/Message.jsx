import React from 'react';
import PropTypes from 'prop-types';

const Message = ({alertMsg:{msg,type},setAlertMsg}) => {
    return (
        <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
            {msg}  
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={()=>setAlertMsg({})} >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
};

Message.propTypes = {
    alertMsg: PropTypes.object.isRequired,
};

export default Message;