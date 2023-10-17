import { ButtonBox, ButtonLabel } from './button.styled';
import { ButtonType } from './button.type';

interface Props {
    type: ButtonType;
    label: string;
    disable: boolean;
    size?: 'sm' | 'mid' | 'large';
    onClick: () => void;
}

function Button({ disable, type, label, size, onClick }: Props) {
    return (
        <ButtonBox
            size={size || 'mid'}
            type={
                type === 'primary'
                    ? 'blue'
                    : type === 'warning'
                    ? 'red'
                    : 'gray'
            }
            onClick={
                disable
                    ? () => {}
                    : e => {
                          e.preventDefault();
                          onClick();
                      }
            }
            disable={disable}
        >
            <ButtonLabel>{label}</ButtonLabel>
        </ButtonBox>
    );
}

export default Button;
