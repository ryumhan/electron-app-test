import Button from '@/components/button';
import DataComPannel from '@/components/dataComPannel';
import LoadingPannel from '@/components/loadingPannel';
import { Vertical } from '@/styled';
import {
    ButtonContainer,
    InspectionTitle,
    InspectionView,
} from '../inspection.styled';
import useBottomRightPannelData from './hook';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import inspectionAtom from '@/atoms/inspection.atom';

function BottomRightPannel() {
    const navigate = useNavigate();
    const [loading, oruData, ccuData, timeOutCallback] =
        useBottomRightPannelData();

    const setComReport = useSetRecoilState(inspectionAtom.comSelector);

    const failHandler = () => {
        setComReport(current => {
            return current.map((elem, idx) =>
                idx === 1 ? { name: elem.name, result: false } : elem,
            );
        });

        navigate('/fail');
    };

    const successandler = () => {
        setComReport(current => {
            return current.map((elem, idx) =>
                idx === 1 ? { name: elem.name, result: true } : elem,
            );
        });
    };

    return (
        <Vertical gap={20} style={{ width: '100%', height: '100%' }}>
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
                        <DataComPannel data={oruData.concat(ccuData || [])} />
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
        </Vertical>
    );
}

export default BottomRightPannel;
