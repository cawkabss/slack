import React from 'react';

const SvgIcon = ({ className, icon }) => (
    <svg className={className}>
        <use xlinkHref={`/svg-sprite/sprite.svg#${icon.id}`} />
    </svg>
);

export default SvgIcon;