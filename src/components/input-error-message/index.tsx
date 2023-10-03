import { TypoGraphy, GlobalColor } from '@/styled';

interface Props {
    msg: string;
}

function InputErrorMessage({ msg }: Props): React.ReactElement {
    return (
        <TypoGraphy style={{ fontSize: '14px', color: GlobalColor.invalid }}>
            {msg}
        </TypoGraphy>
    );
}

export default InputErrorMessage;
