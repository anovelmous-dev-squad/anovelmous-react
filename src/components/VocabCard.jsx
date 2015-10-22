import React from 'react';
import { Card, CardText } from 'material-ui';


export default (props) => {
  const _submitTerm = (event) => {
    event.preventDefault();
    props.onSubmit(props.term);
  };

  return (
    <Card>
      <CardText>
        <p>{props.term}</p>
      </CardText>
      <form onSubmit={_submitTerm}>
        <input type="submit" value="Select" />
      </form>
    </Card>
  );
};
