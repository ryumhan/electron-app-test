import { ComponentProps, useCallback, useState } from 'react';

type handleCallback = {
    hiddenChange: () => void;
    inputChange: ComponentProps<'input'>['onChange'];
    inputClick: () => void;
    inputBlur: () => void;
};

type returnType = [boolean, boolean, string, handleCallback];

interface Props {
    onChangeCallback: (value: string) => void;
}

const useCustomInput = ({ onChangeCallback }: Props): returnType => {
    const [active, setActive] = useState<boolean>(false);

    const [value, setValue] = useState('');
    const [showHidden, setShowHidden] = useState<boolean>(false);

    const handleInputChange: ComponentProps<'input'>['onChange'] = e => {
        setValue(e.target.value);
        onChangeCallback(e.target.value);
    };

    const handleHidden = useCallback(() => {
        setShowHidden(!showHidden);
    }, [showHidden]);

    const handleInputClick = useCallback(() => {
        setActive(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        if (value === '') {
            setActive(false);
        }
    }, [value]);

    const callback: handleCallback = {
        hiddenChange: handleHidden,
        inputChange: handleInputChange,
        inputClick: handleInputClick,
        inputBlur: handleInputBlur,
    };

    return [active, showHidden, value, callback];
};

export default useCustomInput;
