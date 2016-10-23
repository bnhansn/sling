// @flow
import React from 'react';

function renderErrors(errors, name) {
  if (!errors || !errors[name]) return false;

  return errors[name].map((error, i) =>
    <div key={i} style={{ fontSize: '85%', color: '#cc5454' }}>
      {`${name.charAt(0).toUpperCase()}${name.substring(1)} ${error}`}
    </div>
  );
}

type Props = {
  name: string,
  errors?: any,
}

const Errors = ({ errors, name }: Props) =>
  <div>
    {renderErrors(errors, name)}
  </div>;

export default Errors;
