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
import useBottomLeftData from './hook';

import constants from '@/utils/constants';

import { useRecoilState } from 'recoil';
import inspectionAtom from '@/atoms/inspection.atom';
import { imgFailed } from '@/assets';
import { FailedIcons } from '@/components/loadingPannel/loadingPannel.styled';

function BottomLeftPannel() {
    const [
        open,
        heartPresentData,
        cameraPresentData,
        timeOver,
        timeOutCallback,
    ] = useBottomLeftData();

    const [comReport, setComReport] = useRecoilState(
        inspectionAtom.comReportAtom,
    );

    const failHandler = () =>
        setComReport(current => {
            return current.map((elem, idx) =>
                idx === 0 ? { name: elem.name, result: 'Failed' } : elem,
            );
        });

    const successandler = () =>
        setComReport(current => {
            return current.map((elem, idx) =>
                idx === 0 ? { name: elem.name, result: 'Pass' } : elem,
            );
        });

    return (
        <Vertical gap={20} style={{ width: '100%', height: '100%' }}>
            {comReport[0].result === 'Failed' ? (
                <InspectionFail>
                    <FailText>
                        <FailedIcons src={imgFailed} />
                        <TypoGraphy>{`${comReport[0].name} 실패`}</TypoGraphy>
                    </FailText>
                </InspectionFail>
            ) : (
                <InspectionView>
                    <InspectionTitle>WebSocket Test</InspectionTitle>
                    {open ? (
                        <Vertical
                            style={{ height: '100%' }}
                            justifyContent="center"
                            gap={10}
                        >
                            <DataComPannel
                                timeOver={timeOver}
                                data={
                                    heartPresentData ||
                                    constants.DEFAULT_HEARTBEAT_DATA
                                }
                            />
                            <DataComPannel
                                timeOver={timeOver}
                                data={
                                    cameraPresentData ||
                                    constants.DEFAULT_CAMERA_DATA
                                }
                            />
                        </Vertical>
                    ) : (
                        <LoadingPannel
                            loaded={open}
                            message="Connecting WebSocket..."
                            timeOutCallback={timeOutCallback}
                        />
                    )}
                    <ButtonContainer>
                        <Button
                            type="primary"
                            label="Success"
                            onClick={successandler}
                            disable={!open}
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

export default BottomLeftPannel;
