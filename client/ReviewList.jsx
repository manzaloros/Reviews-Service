import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import RatingDisplay from './RatingDisplay.jsx';

export const Arrow = {
  UpArrow: styled.img`
    float: right;
    border: solid silver;
    border-width: 0 2px 2px 0;
    padding: 6px;
    margin-right: 20px;
    margin-top: 7px;
    transform: rotate(-135deg);
  `,

  DownArrow: styled.img`
    float: right;
    border: solid silver;
    border-width: 0 2px 2px 0;
    padding: 6px;
    margin-right: 20px;
    transform: rotate(45deg);
  `
};

export const Styled = {
  Div: styled.div`
    && {
      position: relative;
      border: 1px solid #ddd;
      width: 27.25em;
      float: left;
      margin-top: 0.625em;
      margin-right: 1em;
      margin-bottom: 1em;
      padding-top: 3px;
      padding-bottom: 3px;
      font-family:
        Lato, system-ui, -apple-system,
        BlinkMacSystemFont, Segoe UI, Roboto,
        Helvetica, Arial, sans-serif;
      font-size: 1.6em;
      line-height: 1.4;
    }
  `,

  Toggle: styled.div`
    cursor: pointer;
    outline: none;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    font-size: 18px;
    &:hover ${Arrow.DownArrow} {
      border-right: 2px solid orange;
      border-bottom: 2px solid orange;
    }
    &:hover ${Arrow.UpArrow} {
      border-right: 2px solid orange;
      border-bottom: 2px solid orange;
    }
  `,

  SellerReviewsText: styled.span`
    margin-left: 8px;
    margin-right: 15px;
    color: #414141;
  `,

  Review: styled.div`
    border-top: 1px solid #ddd;
    padding-top: 10px;
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    color: #414141;
    font-size: 12px;
  `,

  ReviewAuthor: styled.div`
    font-size: 11px;
    color: silver;
  `,

  NameListing: styled.a`
    color: #057bc4;
    font-weight: 700;
    font-size: 15px;
    text-decoration: none;
    &:hover {
      color: orange;
    }
  `,

  ReviewCount: styled.span`
    color: silver;
    font-size: 14px;
  `
};

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      rating: 0,
      isShowingReviews: false,
      url: ''
    };
    this.toggleReadMore = this.toggleReadMore.bind(this);
    this.handleSpacebar = this.handleSpacebar.bind(this);
    this.getRenderedReviews = this.getRenderedReviews.bind(this);
    this.assignReviewNames = this.assignReviewNames.bind(this);
  }

  componentDidMount() {
    let url = window.location.href;
    if (url[url.length - 1] !== '/') {
      url += '/';
    }
    const urlArray = url.split('/');
    const endpoint = urlArray[urlArray.length - 2];
    /*
      URL array === http://localhost:2625/item
    */
    this.setState({
      url: urlArray.slice(0, urlArray.length - 2).join('/')
    });

    /*
      REFACTORED GET REQUEST UNCOMMENT WHEN NEEDED /
      COMMENT OUT ALL OTHER GET REQUESTS 154, 158, 207
    */
    $.get(`/reviews/api/item/endpoint/${endpoint}`, (reviews) => {
      // Need to setState on reviews [] and rating number
      // Get average rating from sum of review ratings
      const rating = reviews.reduce((sum, currentReview) => sum + currentReview.rating, 0)
        / reviews.length;
      this.setState((previousState) => ({
        reviews: [...previousState.reviews, reviews],
        rating: previousState.rating + rating
      }));
    });
    /*
      REFACTORED GET REQUEST
    */

    /* Data is a guitar object
    Endpoint is 1-100
    */
    $.get(`/reviews/api/item/endpoint/${endpoint}`, (data) => {
      const currentItem = data;
      // GETs reviews for current item id
      // Calculates average rating
      $.get(`/reviews/api/item/${currentItem._id}/reviews`, (data) => {
        let averageRating = 0;
        if (data.length !== 0) {
          for (let i = 0; i < data.length; i += 1) {
            averageRating += data[i].rating;
          }
          this.setState({
            rating: averageRating / data.length
          });
        } else {
          this.setState({
            rating: 0
          });
        }
        // Data is an array of review objects.
        this.assignReviewNames(data);
      });
    });
  }

  /*
    If reviews are being show, return the reviews array (?)
  */
  getRenderedReviews() {
    const { reviews, isShowingReviews } = this.state;
    if (isShowingReviews && reviews.length > 0) {
      return reviews.slice(0, 5);
    }
    return [];
  }

  /*
  Adds the guitar guitar name to review objects and add them to state array.
  Recursively calls itself
  */
  assignReviewNames(input, index = 0) {
    /* input === array of review objects
    Once function has been recursed index times,
    add the reviews array to the state
    */
    if (index === input.length || index === 5) {
      this.setState({
        reviews: input
      });
    } else {
      /* Data === guitar object.
      Input === array of review objects, need the guitar name property.
       */
      const currentId = input[index].listing_id;
      $.get(`/reviews/api/item/${currentId}`, (data) => {
        const temp = input;
        /*
          listingName is the current guitar name
        */
        temp[index].listingName = data.name;
        this.assignReviewNames(temp, index + 1);
      });
    }
  }

  handleSpacebar(e) {
    if (e.keyCode === 32) {
      this.toggleReadMore();
    }
  }

  toggleReadMore() {
    const { isShowingReviews } = this.state;
    if (isShowingReviews === true) {
      this.setState({
        isShowingReviews: false
      });
    } else {
      this.setState({
        isShowingReviews: true
      });
    }
  }

  render() {
    const {
      reviews, rating, isShowingReviews, url
    } = this.state;
    return (
      <Styled.Div>
        <Styled.Toggle
          role="link"
          tabIndex="0"
          onClick={this.toggleReadMore}
          onKeyDown={this.handleSpacebar}
        >
          <span>
            <Styled.SellerReviewsText>
              Seller Reviews
            </Styled.SellerReviewsText>
            {' '}
            <RatingDisplay rating={rating.toFixed(2)} />
            {' '}
            <Styled.ReviewCount>
              (
              {reviews.length}
              )
            </Styled.ReviewCount>
            {(isShowingReviews) ? <Arrow.UpArrow /> : <Arrow.DownArrow />}
          </span>
        </Styled.Toggle>
        <div>
          {this.getRenderedReviews().map((review) => (
            /* Uses reviews rating, listing_id, name of guitar, author of review, review date,
            review description
            What is the .id key in review? I thought each review had a ._id key?
            Doesn't matter because .id is only used for key prop, maybe delete later?
            */
            <Styled.Review key={review.id}>
              <div>
                <span>
                  <RatingDisplay rating={review.rating.toString()} />
                </span>
              </div>
              {/*
                What does this link do?
                listing_id_count will be 1-100
              */}
              <Styled.NameListing href={`${url}/${review.listing_id_count}`}>
                {review.listingName}
              </Styled.NameListing>
              <div>
                <span>
                  <Styled.ReviewAuthor>
                    {review.author}
                    {' '}
                    -
                    {' '}
                    {review.date.slice(0, 10)}
                  </Styled.ReviewAuthor>
                </span>
              </div>
              <p>{review.description}</p>
            </Styled.Review>
          ))}
        </div>
      </Styled.Div>
    );
  }
}

export default ReviewList;
