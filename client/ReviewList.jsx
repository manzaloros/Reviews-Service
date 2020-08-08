import React from 'react';
import $ from 'jquery';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: {},
      reviews: [],
      rating: 0,
      isShowingReviews: false,
      readMoreButtonText: 'Show Reviews'
    }
    this.toggleReadMore = this.toggleReadMore.bind(this);
    this.getRenderedReviews = this.getRenderedReviews.bind(this);
    this.assignReviewNames = this.assignReviewNames.bind(this);
  }

  componentDidMount() {
    $.get('/item', (data) => {
      var currentItem = data[Math.floor(Math.random() * data.length)];
      this.setState({
        currentItem: currentItem
      });
      $.get(`/item/${currentItem._id}/reviews`, (data) => {
        var averageRating = 0;
        for (var i = 0; i < data.length; i++) {
          averageRating += data[i].rating;
        }
        this.setState({
          rating: averageRating / data.length
        });
        this.assignReviewNames(data);
      });
    });
  }

  assignReviewNames(input, index = 0) {
    if (index === input.length) {
      this.setState({
        reviews: input
      });
    } else {
      var currentId = input[index].listing_id;
      $.get(`/item/${currentId}`, (data) => {
        input[index].listingName = data.name;
        this.assignReviewNames(input, index + 1);
      });
    }
  }

  toggleReadMore() {
    var tempText;
    if (this.state.readMoreButtonText === 'Show Reviews') {
      tempText = 'Hide Reviews';
    } else {
        tempText = 'Show Reviews';
      }
    this.setState({
      isShowingReviews: !this.state.isShowingReviews,
      readMoreButtonText: tempText
    });
  }

  getRenderedReviews() {
    if (this.state.isShowingReviews) {
      return this.state.reviews.slice(0, 5);
    } else {
      return [];
    }
  }

  render() {
    let divStyle = {
      fontFamily: 'sans-serif',
      fontStyle: 'oblique'
    };
    let toggleStyle = {
      fontFamily: 'sans-serif',
      color: 'blue'
    }
    return (
      <div style={divStyle}>
        <div>{this.state.currentItem.name}</div>
        <div style={toggleStyle} onClick={this.toggleReadMore}>
          Seller Reviews: {this.state.rating.toFixed(2)}/5 ({this.state.reviews.length})
        </div>
        <div>
          {this.getRenderedReviews().map((review, i) => {
            return (
              <div>
                <div>{review.rating}/5</div>
                <div>{review.listingName}</div>
                <div>{review.author} - {review.date.slice(0,10)}</div>
                <p>{review.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ReviewList;