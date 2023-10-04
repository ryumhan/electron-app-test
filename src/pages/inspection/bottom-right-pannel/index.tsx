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

function BottomRightPannel() {
    const navigate = useNavigate();
    const [loading, oruData, ccuData, timeOutCallback] =
        useBottomRightPannelData();

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
                    <DataComPannel
                        status="Normal"
                        data={oruData.concat(ccuData || [])}
                    />
                )}
            </InspectionView>
            <ButtonContainer>
                <Button
                    type="primary"
                    label="Success"
                    onClick={() => alert('hi')}
                    disable={loading}
                />
                <Button
                    type="warning"
                    label="Fail"
                    onClick={() => navigate('/fail')}
                    disable={false}
                />
            </ButtonContainer>
        </Vertical>
    );
}

export default BottomRightPannel;
