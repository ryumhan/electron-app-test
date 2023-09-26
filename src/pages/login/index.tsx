import Button from '@/components/button';
import { Horizontal, Vertical } from '@/styled';
import {
    CopyrightBox,
    CopyrightMessage,
    LoginBox,
    LoginInput,
    LoginLabel,
    PageContainer,
} from './login.styled';

function Login() {
    return (
        <PageContainer>
            <LoginBox>
                <Vertical
                    style={{ justifyContent: 'space-between', height: '100%' }}
                >
                    <Vertical style={{ gap: '30px' }}>
                        <Vertical style={{ gap: '10px' }}>
                            <LoginLabel>ID</LoginLabel>
                            <LoginInput />
                        </Vertical>
                        <Vertical style={{ gap: '10px' }}>
                            <LoginLabel>PASSWORD</LoginLabel>

                            <LoginInput />
                        </Vertical>
                    </Vertical>

                    <CopyrightBox>
                        <CopyrightMessage>
                            This Application is available to only allowed people
                            @avikus
                        </CopyrightMessage>
                    </CopyrightBox>
                    <Horizontal style={{ justifyContent: 'end' }}>
                        <Button
                            type="primary"
                            label="Verify"
                            onClick={() => alert('hi')}
                            disable={false}
                        />
                    </Horizontal>
                </Vertical>
            </LoginBox>
        </PageContainer>
    );
}

export default Login;
