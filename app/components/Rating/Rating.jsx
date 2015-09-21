import React from 'react';
import _ from 'lodash';

const MAX_STARS = 5;

export default class Rating extends React.Component {

 render() {
   return (
     <div className="stars">
       {
         this.retrieveRating()
       }
     </div>
   );
 }

 retrieveRating() {
   return _.range(MAX_STARS).map((idx) => {
     return idx < this.props.score ?
             <i key={idx} className="fa fa-star"
                          data-rating={idx}/>
             :
             <i key={idx} className="fa fa-star-o"
                          data-rating={idx}/>;
   });
 }
}

Rating.propTypes = {
  score: React.PropTypes.number
};
