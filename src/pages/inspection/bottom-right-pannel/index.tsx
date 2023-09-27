import Button from '@/components/button';
import DataComPannel from '@/components/dataComPannel';
import LoadingPannel from '@/components/loadingPannel';
import { Vertical, Horizontal } from '@/styled';
import { InspectionTitle, InspectionView } from '../inspection.styled';
import useBottomRightPannelData from './hook';

function BottomRightPannel() {
    const [loading, oruData, ccuData, timeOutCallback] =
        useBottomRightPannelData();

    return (
        <Vertical gap={20} style={{ width: '100%', height: '100%' }}>
            <InspectionTitle>HTTP Request Test</InspectionTitle>
            <InspectionView>
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
            <Horizontal gap={10} justifyContent="flex-end">
                <Button
                    type="primary"
                    label="Success"
                    onClick={() => alert('hi')}
                    disable={loading}
                />
                <Button
                    type="warning"
                    label="Fail"
                    onClick={() => alert('hi')}
                    disable={loading}
                />
            </Horizontal>
        </Vertical>
    );
}

export default BottomRightPannel;
