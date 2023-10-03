import styled from '@emotion/styled';

export type FlexDirection = 'row' | 'column';
export type FlexSortType =
    | 'flex-start'
    | 'space-around'
    | 'center'
    | 'space-between'
    | 'flex-end';

export type FlexProps = {
    auto?: boolean;
    column?: boolean;
    alignItems?: FlexSortType;
    alignSelf?: FlexSortType;
    justifyContent?: FlexSortType;
    justifySelf?: FlexSortType;
    gap?: number;
};

export const FlexStyle = styled.div<FlexProps>(
    ({ column, alignItems, alignSelf, justifyContent, justifySelf, gap }) => ({
        display: 'flex',
        flexDirection: column ? 'column' : 'row',
        gap: `${gap || 0}px`,
        alignItems,
        alignSelf,
        justifyContent,
        justifySelf,
    }),
);

export const Horizontal = styled(FlexStyle)`
    flex-direction: row;
    align-items: center;
`;

export const Vertical = styled(FlexStyle)`
    flex-direction: column;
`;

export const Center = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export const GlobalColor = {
    title: '#3c3c3c',
    generalTone: '#6e6e6e',
    contentsTone: '#828282',
    lightTone: '#3CB4FF',
    text: '#3c3c3c',
    invalid: 'orange',
};

interface TypoGraphyProps {
    type?: 'middle' | 'normal' | 'bold';
}

export const TypoGraphy = styled.span<TypoGraphyProps>(({ type }) => ({
    fontWeight: type === 'middle' ? '500' : type === 'bold' ? 'bold' : '400',
}));
