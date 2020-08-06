import React from 'react';

class ReviewList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      rating: 0,
      isShowingReviews: false,
      readMoreButtonText: 'Show Reviews'
    }
    this.toggleReadMore = this.toggleReadMore.bind(this);
    this.getRenderedReviews = this.getRenderedReviews.bind(this);
  }

  componentDidMount() {
    var tempReviews = [];
    var tempRating = 0;
    var reviewCount = Math.floor(Math.random() * 10) + 3;
    for (var i = 0; i < reviewCount; i++) {
      tempReviews.push({description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?", rating: Math.floor(Math.random() * 5) + 1, date: Math.floor(Math.random() * 50)});
      tempRating += tempReviews[i].rating;
    }
    this.setState({
      reviews: tempReviews.sort((a, b) => {
        return (b.date - a.date);
      }),
      rating: tempRating / reviewCount
    });
  }

  toggleReadMore() {
    this.setState({
      isShowingReviews: !this.state.isShowingReviews,
      readMoreButtonText: (this.state.readMoreButtonText === 'Show Reviews') ? 'Hide Reviews' : 'Show Reviews'
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
    return (
      <div className="review-list">
        <div id="toggle" onClick={this.toggleReadMore}>{this.state.reviews.length} reviews ({this.state.rating.toFixed(2)}/5)</div>
        <div>
          {this.getRenderedReviews().map((review, i) => {
            return (<div>{review.rating}/5
              <div>{review.date}</div>
              <p>{review.description}</p>
              </div>);
          })}
        </div>
      </div>
    );
  }
}

export default ReviewList;