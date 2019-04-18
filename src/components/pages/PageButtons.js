import React from "react";
import { connect } from "react-redux";
import { pageUp, pageDown } from "../../actions";

class PageButton extends React.Component {
  renderButtons = () => {
    if (this.props.page === 1) {
      return (
        <div>
          <button
            className="ui right floated button"
            onClick={this.props.pageUp}
          >
            Next Page
          </button>
        </div>
      );
    } else if (Math.ceil(this.props.sessions.length / 10) === this.props.page) {
      return (
        <div>
          <button
            className="ui left floated button"
            onClick={this.props.pageDown}
          >
            Prev Page
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            className="ui left floated button"
            onClick={this.props.pageDown}
          >
            Prev Page
          </button>
          <button
            className="ui right floated button"
            onClick={this.props.pageUp}
          >
            Next Page
          </button>
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderButtons()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.page.page
  };
};

export default connect(
  mapStateToProps,
  { pageUp, pageDown }
)(PageButton);
