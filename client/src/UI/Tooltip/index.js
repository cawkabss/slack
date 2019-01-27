import React from 'react';

import Tooltip from '@evo/tooltip';
import tooltipWhite from '@evo/tooltip/src/themeWhite/styles.sss'
import tooltipBlack from '@evo/tooltip/src/themeBlack/styles.sss'
 
const TooltipWrapper = ({ children, theme, ...rest }) => (
    <Tooltip
        css={theme === 'black' ? tooltipBlack : tooltipWhite}
        { ...rest }
    >
        { children }
    </Tooltip>
);

export default TooltipWrapper;