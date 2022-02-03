import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { Icon } from 'antd';
import BigNumber from 'bignumber.js';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'comm... Remove this comment to see the full error message
import commaNumber from 'comma-number';
import { useWeb3React } from '@web3-react/core';
import { Card } from 'components/Basic/Card';
import { Row, Column } from 'components/Basic/Style';
import DelegationTypeModal from 'components/Basic/DelegationTypeModal';

const VotingPowerWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  border-radius: 20px;
  background-image: linear-gradient(to right, #f2c265, #f7b44f);

  .title {
    font-size: 20px;
    color: var(--color-text-main);
    font-weight: bold;
    margin-left: 12px;
  }

  .content {
    color: var(--color-text-main);
    font-size: 28.5px;
    font-weight: 900;
    margin-left: 12px;
  }

  .voting-weight {
    span {
      color: var(--color-bg-main);
    }
  }

  .voting-hint {
    min-height: 84px;
    border-radius: 20px;
    padding: 12px 24px;
    background-color: var(--color-bg-primary);
    color: #fff;

    @media only screen and (max-width: 992px) {
      &-left {
        margin-bottom: 12px;
      }
    }

    &-left {
      font-size: 20px;
      line-height: 24px;
      .info-circle {
        font-size: 24px;
        color: var(--color-gold);
        margin-right: 16px;
      }
    }
    &-right {
      position: relative;
      font-size: 16px;
      line-height: 24px;
      &-l1 {
        position: relative;
        margin-bottom: 12px;
        .connect-line {
          position: absolute;
          width: 1px;
          height: 12px;
          bottom: -12px;
          left: 10px;
          background-color: #fff;
        }
      }
      .step-number {
        display: inline-block;
        width: 20px;
        height: 20px;
        font-size: 12px;
        line-height: 20px;
        border: 1px solid #fff;
        border-radius: 100%;
        text-align: center;
      }
      .step-text {
        margin-left: 9px;
        i {
          color: var(--color-gold);
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .check-circle-icon {
        display: inline-block;
        color: var(--color-text-green);
        font-size: 20px;
      }
    }
  }
`;

const format = commaNumber.bindWith(',', '.');

function VotingPower({
  history,
  power,
  balance,
  delegateStatus,
  stakedAmount
}: 
$TSFixMe) {
  const { account } = useWeb3React();

  const [isOpenDelegationModal, setIsOpenDelegationModal] = useState(false);

  return (
    <>
      <Row>
        <Column xs="12" sm="12" md="12">
          <Card>
            <VotingPowerWrapper>
              <Row className="flex align-center flex-wrap">
                <Column className="voting-weight" xs="12" sm="12" md="5">
                  <p className="title">Voting Weight</p>
                  <p className="content">{format(power)}</p>
                </Column>
                <Column xs="12" sm="12" md="7" className=" voting-hint">
                  <Row className="flex flex-wrap align-center">
                    <Column
                      xs="12"
                      md="5"
                      lg="4"
                      className="voting-hint-left flex align-center"
                    >
                      <Icon className="info-circle" type="info-circle" />
                      <span>To vote you should:</span>
                    </Column>
                    <Column
                      xs="12"
                      md="7"
                      lg="8"
                      className="voting-hint-right just-between"
                    >
                      <div className="flex align-center voting-hint-right-l1">
                        <div className="connect-line" />
                        {!new BigNumber(stakedAmount).gt(0) ? (
                          <span className="step-number">1</span>
                        ) : (
                          <Icon
                            className="check-circle-icon"
                            type="check-circle"
                            theme="filled"
                          />
                        )}
                        <span className="step-text">
                          <i
                            onClick={() => {
                              history.push('/vault');
                            }}
                          >
                            Lock your tokens
                          </i>{' '}
                          to the XVS Vault
                        </span>
                      </div>
                      <div className="flex align-center">
                        {!delegateStatus ? (
                          <span className="step-number">2</span>
                        ) : (
                          <Icon
                            className="check-circle-icon"
                            type="check-circle"
                            theme="filled"
                          />
                        )}
                        <span className="step-text">
                          <i
                            onClick={() => {
                              setIsOpenDelegationModal(true);
                            }}
                          >
                            Delegate your voting power
                          </i>
                        </span>
                      </div>
                    </Column>
                  </Row>
                </Column>
              </Row>
            </VotingPowerWrapper>
          </Card>
        </Column>
      </Row>
      <DelegationTypeModal
        visible={isOpenDelegationModal}
        balance={balance}
        delegateStatus={delegateStatus}
        address={account || ''}
        onCancel={() => setIsOpenDelegationModal(false)}
      />
    </>
  );
}

VotingPower.propTypes = {
  power: PropTypes.string,
  history: PropTypes.object.isRequired,
  balance: PropTypes.string.isRequired,
  delegateStatus: PropTypes.string.isRequired,
  stakedAmount: PropTypes.string.isRequired
};

VotingPower.defaultProps = {
  power: '0.00000000'
};

export default VotingPower;
