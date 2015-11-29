import React from 'react';
import { Card, CardActions, CardTitle,
         CardText, RaisedButton } from 'material-ui';


const VocabCard = (props) => {
  const _submitTerm = (event) => {
    event.preventDefault();
    props.onSubmit(props.term);
  };

  return (
    <Card initiallyExpanded={false}>
      <CardTitle
        title={props.term}
        subtitle={props.tag}
        actAsExpander
        />
      <CardActions>
        <form onSubmit={_submitTerm}>
          <RaisedButton label="Select" primary>
            <input type="submit" hidden />
          </RaisedButton>
        </form>
      </CardActions>
      {props.description &&
        <CardText expandable>
          {props.description}
        </CardText>
      }
    </Card>
  );
};

VocabCard.propTypes = {
  term: React.PropTypes.string.isRequired,
  tag: React.PropTypes.string,
  description: React.PropTypes.string
};

export default VocabCard;
