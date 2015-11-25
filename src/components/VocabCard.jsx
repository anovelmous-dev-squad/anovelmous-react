import React from 'react';
import { Avatar, Card, CardActions, CardHeader,
         CardText, FlatButton, FontIcon } from 'material-ui';


const VocabCard = (props) => {
  const _submitTerm = (event) => {
    event.preventDefault();
    props.onSubmit(props.term);
  };

  const avatar = (
    <Avatar
      icon={<FontIcon className="material-icons">accessibility</FontIcon>} />
  );

  return (
    <Card initiallyExpanded={false}>
      <CardHeader
        title={props.term}
        subtitle={props.tag}
        avatar={avatar}
        actAsExpander
        showExpandableButton />
      <CardActions>
        <form onSubmit={_submitTerm}>
          <FlatButton label="Select" primary>
            <input type="submit" hidden />
          </FlatButton>
        </form>
      </CardActions>
      <CardText expandable>
        {props.description || 'Lorem ipsum blah blah blah...'}
      </CardText>
    </Card>
  );
};

VocabCard.propTypes = {
  term: React.PropTypes.string.isRequired,
  tag: React.PropTypes.string,
  description: React.PropTypes.string
};

export default VocabCard;
