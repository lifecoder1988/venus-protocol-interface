import React from 'react';
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { Icon } from 'antd';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reco... Remove this comment to see the full error message
import { compose } from 'recompose';
import { connectAccount } from 'core';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'comm... Remove this comment to see the full error message
import commaNumber from 'comma-number';
import coinImg from 'assets/img/venus_32.png';
import { Card } from 'components/Basic/Card';
import { BASE_BSC_SCAN_URL } from '../../config';

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 25px;
  background-color: var(--color-bg-primary);
  padding: 37px 16px;

  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 16px;
  }

  p {
    font-size: 17.5px;
    font-weight: 900;
    color: var(--color-text-main);
  }

  .copy-btn {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--color-bg-active);
    margin-left: 26px;

    i {
      color: var(--color-text-main);
      svg {
        transform: rotate(-45deg);
      }
    }
  }
`;

const format = commaNumber.bindWith(',', '.');


function CoinInfo({ address, balance }: $TSFixMe) {
  const handleLink = () => {
    window.open(`${BASE_BSC_SCAN_URL}/address/${address}`, '_blank');
  };

  return (
    <Card>
      <CardWrapper className="flex align-center just-between">
        <div className="flex align-center">
          <img src={coinImg} alt="coin" />
          <p>{format(balance)}</p>
        </div>
        {address ? (
          <div
            className="flex align-center just-center pointer"
            onClick={() => handleLink()}
          >
            <p className="highlight">
              {`${address.substr(0, 4)}...${address.substr(
                address.length - 4,
                4
              )}`}
            </p>
            <div className="flex align-center just-center copy-btn">
              <Icon type="arrow-right" />
            </div>
          </div>
        ) : (
          ''
        )}
      </CardWrapper>
    </Card>
  );
}

CoinInfo.propTypes = {
  address: PropTypes.string,
  balance: PropTypes.string
};

CoinInfo.defaultProps = {
  address: '',
  balance: '0.0000'
};


const mapStateToProps = ({ account }: $TSFixMe) => ({
  settings: account.setting
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0-1 arguments, but got 2.
export default compose(connectAccount(mapStateToProps, undefined))(CoinInfo);
