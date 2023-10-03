import { CSSProperties } from 'react';
import { InputContainer, Input, Label, PasswordDisplayButton } from './styled';

import useCustomInput from './hook';

interface Props {
    name: string;
    label: string;
    type: 'email' | 'number' | 'password' | 'text';
    style?: CSSProperties;
    onChangeCallback: (value: string) => void;
}

function CustomInput({
    name,
    label,
    style,
    type,
    onChangeCallback,
}: Props): React.ReactElement {
    const [active, showHidden, inputValue, handleCallback] = useCustomInput({
        onChangeCallback,
    });

    return (
        <InputContainer style={style}>
            <Input
                name={name}
                type={type === 'password' && !showHidden ? 'password' : 'text'}
                size={25}
                value={inputValue}
                onChange={handleCallback.inputChange}
                onClick={handleCallback.inputClick}
                onFocus={handleCallback.inputClick}
                onBlur={handleCallback.inputBlur}
            />
            <Label active={active}>{label}</Label>
            {type === 'password' && (
                <PasswordDisplayButton onClick={handleCallback.hiddenChange}>
                    {showHidden ? '숨김' : '표시'}
                </PasswordDisplayButton>
            )}
        </InputContainer>
    );
}

export default CustomInput;
