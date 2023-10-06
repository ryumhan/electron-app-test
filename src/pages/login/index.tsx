import Button from '@/components/button';
import { Horizontal, TypoGraphy, Vertical } from '@/styled';
import {
    CopyrightBox,
    CopyrightMessage,
    InputWrapper,
    LoginBox,
    PageContainer,
} from './login.styled';

import { Controller, useForm } from 'react-hook-form';
import { ComponentProps } from 'react';
import CustomInput from '@/components/custom-input';
import InputErrorMessage from '@/components/input-error-message';
import { useNavigate } from 'react-router-dom';

type FormData = {
    id: string;
    password: string;
};

function Login() {
    const navigate = useNavigate();
    const {
        control,
        formState: { errors, isValid },
        getValues,
        handleSubmit,
    } = useForm<FormData>({
        mode: 'onChange',
    });

    const onValid = async (data: FormData) => {
        try {
            const { id, password } = data;
            if (id !== 'avikus') {
                control.setError('id', {
                    message: '해당하는 아이디가 존재 하지 않습니다.',
                });

                return;
            }

            if (password !== 'avikus12#') {
                control.setError('password', {
                    message: '비밀번호가 일치하지 않습니다.',
                });
            }

            navigate('/ready');
        } catch (error) {
            control.setError('id', {
                message: '로그인 오류가 발생하였습니다.',
            });
        }
    };

    const onInValid = () => {
        control.setError('password', {
            message: '로그인 오류가 발생하였습니다.',
        });
    };

    const handleKeyDown: ComponentProps<'div'>['onKeyDown'] = event => {
        if (event.key === 'Enter')
            onValid({ id: getValues().id, password: getValues().password });
    };

    return (
        <PageContainer>
            <Vertical
                justifyContent="center"
                gap={40}
                style={{ margin: 'auto' }}
            >
                <Horizontal justifyContent="center">
                    <TypoGraphy type="bold" style={{ fontSize: '25px' }}>
                        ORU INSPECTION SW
                    </TypoGraphy>
                </Horizontal>
                <LoginBox>
                    <Vertical gap={40}>
                        <Vertical style={{ gap: '30px' }}>
                            <Vertical style={{ gap: '10px' }}>
                                <Controller
                                    name="id"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                '아이디를 입력하여 주세요.',
                                        },
                                    }}
                                    render={({ field: { onChange, name } }) => (
                                        <InputWrapper>
                                            <CustomInput
                                                name={name}
                                                type="text"
                                                label="아이디"
                                                style={{ width: '100%' }}
                                                onChangeCallback={onChange}
                                            />
                                            {errors.id && errors.id.message && (
                                                <InputErrorMessage
                                                    msg={errors.id.message}
                                                />
                                            )}
                                        </InputWrapper>
                                    )}
                                />
                            </Vertical>
                            <Vertical style={{ gap: '10px' }}>
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                '패스워드를 입력하여 주세요',
                                        },
                                    }}
                                    render={({ field: { onChange, name } }) => (
                                        <InputWrapper onKeyDown={handleKeyDown}>
                                            <CustomInput
                                                name={name}
                                                type="password"
                                                label="비밀번호"
                                                style={{ width: '100%' }}
                                                onChangeCallback={onChange}
                                            />
                                            {errors.password &&
                                                errors.password.message && (
                                                    <InputErrorMessage
                                                        msg={
                                                            errors.password
                                                                .message
                                                        }
                                                    />
                                                )}
                                        </InputWrapper>
                                    )}
                                />
                            </Vertical>
                        </Vertical>

                        <CopyrightBox>
                            <CopyrightMessage>
                                This Application is available to only allowed
                                people
                            </CopyrightMessage>
                        </CopyrightBox>
                        <Horizontal style={{ justifyContent: 'end' }}>
                            <Button
                                type="primary"
                                label="Verify"
                                onClick={handleSubmit(onValid, onInValid)}
                                disable={!isValid}
                            />
                        </Horizontal>
                    </Vertical>
                </LoginBox>
            </Vertical>
        </PageContainer>
    );
}

export default Login;
