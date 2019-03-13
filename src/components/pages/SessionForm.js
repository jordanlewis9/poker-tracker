import React from "react";
import { Field, reduxForm } from "redux-form";

class SessionForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form"
      >
        <Field name="game" component="select" label="Choose a Game">
          <option />
          <option value="No Limit Hold 'Em">No Limit Hold 'Em</option>
          <option value="Pot Limit Omaha">Pot Limit Omaha</option>
          <option value="Other">Other</option>
        </Field>
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
        <Field name="place" component="input" label="Venue/Site" />
        <Field name="date" component="input" type="date" label="Date" />
        <Field
          name="length"
          component="input"
          type="number"
          label="Time Length"
        />
        <Field
          name="buyin"
          component="input"
          type="number"
          label="Buy-In/Starting Bankroll"
        />
        <Field
          name="cashout"
          component="input"
          type="number"
          label="Cash-Out/Ending Bankroll"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

SessionForm = reduxForm({
  form: "session"
})(SessionForm);

export default SessionForm;
