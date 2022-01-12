import React from 'react';
import PropTypes from 'prop-types';
import Text from 'common/components/Text';
import Link from 'common/components/Link';
import Image from 'common/components/Image';

const Logo = ({
  logoWrapperStyle,
  logoStyle,
  titleStyle,
  withAnchor,
  anchorProps,
  logoSrc,
  title,
  ...props
}) => (
  <Link {...props} {...logoWrapperStyle}>
    {withAnchor ? (
      <a {...anchorProps}>
        {logoSrc ? (
          <>
            <Image src={logoSrc.src} alt={title} {...logoStyle} />
          </>
        ) : (
          <Text content={title} {...titleStyle} />
        )}
      </a>
    ) : (
      <>
        {logoSrc ? (
          <>
            <Image src={logoSrc.src} alt={title} {...logoStyle} />
            <Text content={title} {...titleStyle} />
          </>
        ) : (
          <Text content={title} {...titleStyle} />
        )}
      </>
    )}
  </Link>
);

Logo.propTypes = {
  logoSrc: PropTypes.object,
  title: PropTypes.string.isRequired,
  logoWrapperStyle: PropTypes.object,
  logoStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  withAnchor: PropTypes.bool,
  anchorProps: PropTypes.object,
};

Logo.defaultProps = {
  logoWrapperStyle: {
    display: 'inline-flex',
    alignItems: 'center',
    mr: '1rem',
    'a:hover,a:focus': {
      textDecoration: 'none',
    },
  },
  titleStyle: {
    fontFamily: 'Poppins',
    fontSize: '18px',
    color: '#c4c4c4',
    ml: '11px',
    lineHeight: '27px',
    mt: '20px',
    whiteSpace: 'nowrap',
  },
};
export default Logo;
