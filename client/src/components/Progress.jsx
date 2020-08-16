import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({uploadPercentage}) => {
    return (
        <div className="progress">
            <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: `${uploadPercentage}%`}}>
                {uploadPercentage}%
            </div>
        </div>
    );
};

Progress.propTypes = {
    uploadPercentage: PropTypes.number.isRequired
};

export default Progress;