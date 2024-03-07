import React, { useEffect } from 'react';
import LoadingPannel from '@/components/loadingPannel';
import useORUIP from '@/hooks/useORUIP';

import { Horizontal, TypoGraphy, Vertical } from '@/styled';

import BottomLeftPannel from './bottom-left-pannel';
import BottomRightPannel from './bottom-right-pannel';

import {
    BottomPannel,
    HeaderBack,
    HeaderFront,
    PageContainer,
    PageHeader,
    RightPannelContainer,
} from './inspection.styled';

import TopPannel from './top-pannel';
import Button from '@/components/button';

import { ipcRenderer } from 'electron';
import { useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import inspectionAtom from '@/atoms/inspection.atom';
import constants from '@/utils/constants';
import VerticalStepProgressBar from '@/components/vertical-step-progress';
import statusAtom from '@/atoms/status.atom';

const { COM_INSPECTION_STEP } = constants;

function Inspection(): React.ReactElement {
    const navigate = useNavigate();

    const { oruIp, found, timeOutCallback } = useORUIP();

    const sn = useRecoilValue(statusAtom.snAtom);

    const status = useRecoilValue(inspectionAtom.statusSelector);
    const svmReport = useRecoilValue(inspectionAtom.svmReportAtom);
    const comReport = useRecoilValue(inspectionAtom.comReportAtom);
    const currentStep = useRecoilValue(inspectionAtom.svmStepSelector);

    const reloadCallback = () => {
        ipcRenderer.send('create-module', {});
    };

    useEffect(() => {
        reloadCallback();
    }, []);

    if (!found) {
        return (
            <LoadingPannel
                loadingTimeout={20 * 1000}
                loaded={found}
                message="Finding ORU available..."
                timeOutCallback={() => {
                    timeOutCallback();
                    navigate('/');
                }}
            />
        );
    }

    const buttonType =
        status === 'Pass'
            ? 'primary'
            : status === 'Failed'
            ? 'warning'
            : 'normal';

    const resultButtonCallback = () =>
        status === 'Pass' ? navigate('/success') : navigate('/fail');

    const exitButtonCallback = () => {
        // eslint-disable-next-line no-alert, no-restricted-globals
        const rst = confirm('정말로 종료하시겠습니까?');
        if (rst) ipcRenderer.send('app-quit', {});
    };

    return (
        <PageContainer>
            <PageHeader
                justifyContent="space-between"
                alignItems="center"
                complete={status === 'Pass'}
            >
                <HeaderFront>
                    <Horizontal gap={10}>
                        <TypoGraphy type="bold">모트렉스 SN:</TypoGraphy>
                        <TypoGraphy type="bold" style={{ color: 'blue' }}>
                            {sn}
                        </TypoGraphy>
                    </Horizontal>
                    <Horizontal gap={10}>
                        <TypoGraphy type="bold">Target Oru:</TypoGraphy>
                        <TypoGraphy type="bold" style={{ color: 'blue' }}>
                            {oruIp}
                        </TypoGraphy>
                    </Horizontal>
                </HeaderFront>
                <HeaderBack gap={50}>
                    <TypoGraphy type="bold">Test Result:</TypoGraphy>
                    <Button
                        type={buttonType}
                        label={status}
                        disable={status === 'Progressing'}
                        onClick={resultButtonCallback}
                    />
                </HeaderBack>
            </PageHeader>
            <Vertical style={{ height: '100%', paddingTop: '20px' }} gap={10}>
                {/* left pannel */}
                <VerticalStepProgressBar
                    multiple
                    steps={constants.SVM_INSPECTION_STEP.map(elem => {
                        return { name: elem.name, checklist: elem.checkList };
                    })}
                    reportList={svmReport}
                    currentStep={currentStep}
                    position="left"
                    title="SVM 검사 항목"
                />

                {/* center pannel */}
                {/* Top */}
                <TopPannel />
                {/* Bottom */}
                <BottomPannel>
                    {/* Left */}
                    <BottomLeftPannel />
                    {/* Right */}
                    <BottomRightPannel />
                </BottomPannel>
                {/* center pannel */}

                {/* right pannel */}
                <VerticalStepProgressBar
                    multiple={false}
                    steps={COM_INSPECTION_STEP.map(elem => {
                        return { name: elem.name, checklist: elem.checkList };
                    })}
                    reportList={comReport}
                    currentStep={0}
                    position="right"
                    title="통신 검사 항목"
                />

                <RightPannelContainer>
                    <Button
                        size="mid"
                        type="warning"
                        label="검사 종료"
                        disable={false}
                        onClick={exitButtonCallback}
                    />
                </RightPannelContainer>
            </Vertical>
        </PageContainer>
    );
}

export default Inspection;
