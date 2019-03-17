import React from "react";
import { Field, reduxForm } from "redux-form";

class SessionForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  renderInput = (formValues) => {
    const className = "fields";
    return (
      <div className={className}>
        <label className="label">{formValues.label} </label>
        <input {...formValues.input} />
      </div>
    );
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        // className="ui form"
        id="form"
      >
        <div className="forms">
          <div className="fields">
            <label className="label">Choose a Game </label>
            <Field name="game" component="select" label="Choose a Game">
              <option />
              <option value="No Limit Hold 'Em">No Limit Hold 'Em</option>
              <option value="Pot Limit Omaha">Pot Limit Omaha</option>
              <option value="Other">Other</option>
            </Field>
          </div>
          <div className="fields">
            <label className="label">Stakes </label>
            <Field name="stakes" component="select" label="Stakes">
              <option />
              <option value="0.02/0.05">0.02/0.05</option>
              <option value="0.05/0.10">0.05/0.10</option>
              <option value="0.10/0.25">0.10/0.25</option>
              <option value="0.25/0.50">0.25/0.50</option>
              <option value="0.50/1">0.50/1</option>
              <option value="1/2">1/2</option>
              <option value="2/5">2/5</option>
            </Field>
          </div>
          <Field name="place" component={this.renderInput} label="Venue/Site" />
          <div className="fields">
            <label className="label">Date </label>
            <Field name="date" component="input" type="date" label="Date" />
          </div>
          <Field
            name="time"
            component={this.renderInput}
            type="number"
            label="Time Length (in hours)"
          />
        </div>
        <div className="forms">
          <Field
            name="buyin"
            component={this.renderInput}
            type="number"
            label="Buy-In"
          />
          <Field
            name="cashout"
            component={this.renderInput}
            type="number"
            label="Cash-Out"
          />
        </div>
        <div className="enter">
          <button className="ui button green">Submit</button>
        </div>
      </form>
    );
  }
}

SessionForm = reduxForm({
  form: "session"
})(SessionForm);

export default SessionForm;
