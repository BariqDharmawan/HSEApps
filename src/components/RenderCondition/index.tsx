import { ReactNode } from 'react';

const RenderCondition = ({
    firstCondition,
    renderWhenTrue,
    renderWhenFalse,
}: {
    firstCondition: boolean;
    renderWhenTrue: ReactNode;
    renderWhenFalse?: ReactNode;
}) => {
    if (firstCondition) {
        return renderWhenTrue;
    }

    if (renderWhenFalse) {
        return renderWhenFalse;
    }

    return null;
};

export default RenderCondition;
