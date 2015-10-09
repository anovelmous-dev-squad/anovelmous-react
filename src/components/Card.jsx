import React from 'react';
import Radium from 'radium';


const style{

	base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: red,//'#BE1E2D',// this should varied by content displayed?
    color: green,//'rgb(212, 208, 208)',
    paddingLeft: 3,
    paddingTop: 3,
    height: 10

}

//TO-DO: input 


export default class Card extends React.Component{
	//static propTypes = {
    //chapter: PropTypes.object.isRequired
  //}
  render() {
  	return (
  		<div class=card style={style.base}>
  		testing//text here
  		//textRetrive
  		</div>
  		);
  }
}