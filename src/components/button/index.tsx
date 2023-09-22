import { ButtonBox, ButtonLabel } from './button.styled';
import { ButtonType } from './button.type';

interface Props {
    type: ButtonType;
    label: string;
    onClick: () => void;
}

function Button({ type, label, onClick }: Props) {
    return (
        <ButtonBox
            type={
                type === 'primary'
                    ? 'blue'
                    : type === 'warning'
                    ? 'red'
                    : 'gray'
            }
            onClick={onClick}
        >
            <ButtonLabel>{label}</ButtonLabel>
        </ButtonBox>
    );
}

export default Button;
