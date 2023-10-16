import Button from '@/components/button';
import DataComPannel from '@/components/dataComPannel';
import LoadingPannel from '@/components/loadingPannel';
import { TypoGraphy, Vertical } from '@/styled';
import {
    ButtonContainer,
    FailText,
    InspectionFail,
    InspectionTitle,
    InspectionView,
} from '../inspection.styled';
import useBottomRightPannelData from './hook';
// import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import inspectionAtom from '@/atoms/inspection.atom';
import { FailedIcons } from '@/components/loadingPannel/loadingPannel.styled';
import { imgFailed } from '@/assets';

function BottomRightPannel() {
    // const navigate = useNavigate();
    const [loading, oruData, ccuData, timeOutCallback] =
        useBottomRightPannelData();

    const [httpResult, setComReport] = useRecoilState(
        inspectionAtom.comReportAtom,
    );

    const failHandler = () => {
        setComReport(current => {
            return current.map((elem, idx) =>
                idx === 1 ? { name: elem.name, result: 'Failed' } : elem,
            );
        });

        // navigate('/fail');
    };

    const successandler = () => {
        setComReport(current => {
            return current.map((elem, idx) =>
                idx === 1 ? { name: elem.name, result: 'Pass' } : elem,
            );
        });
    };

    return (
        <Vertical gap={20} style={{ width: '100%', height: '100%' }}>
            {httpResult[1].result === 'Failed' ? (
                <InspectionFail>
                    <FailText>
                        <FailedIcons src={imgFailed} />
                        <TypoGraphy>{`${httpResult[1].name} 실패`}</TypoGraphy>
                    </FailText>
                </InspectionFail>
            ) : (
                <InspectionView>
                    <InspectionTitle>HTTP Request Test</InspectionTitle>
                    {loading ? (
                        <LoadingPannel
                            loaded={!!(ccuData && oruData)}
                            message="Connecting HttpServer..."
                            timeOutCallback={timeOutCallback}
                        />
                    ) : (
                        <Vertical
                            style={{ height: '100%' }}
                            justifyContent="center"
                        >
                            <DataComPannel
                                data={oruData.concat(ccuData || [])}
                            />
                        </Vertical>
                    )}
                    <ButtonContainer>
                        <Button
                            type="primary"
                            label="Success"
                            onClick={successandler}
                            disable={loading}
                        />
                        <Button
                            type="warning"
                            label="Fail"
                            onClick={failHandler}
                            disable={false}
                        />
                    </ButtonContainer>
                </InspectionView>
            )}
        </Vertical>
    );
}

export default BottomRightPannel;
