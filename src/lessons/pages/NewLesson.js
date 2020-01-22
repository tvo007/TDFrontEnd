import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import {useForm} from '../../shared/hooks/form-hooks';
import {useHttpClient} from '../../shared/hooks/http-hook';
import {AuthContext} from '../../shared/context/auth-context';
import './NewLesson.css';

const NewLesson = () => {
  const auth = useContext (AuthContext);
  const {isLoading, error, sendRequest, clearError} = useHttpClient ();
  const [formState, inputHandler] = useForm (
    {
      title: {
        value: '',
        isValid: false,
      },

      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const history = useHistory ();

  const lessonSubmitHandler = async event => {
    event.preventDefault ();
    try {
      await sendRequest (
        'http://localhost:5000/api/lessons',
        'POST',
        JSON.stringify ({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          creator: auth.userId,
        }),
        {'Content-Type': 'application/json'}
      );
      history.push ('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="note-form" onSubmit={lessonSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE ()]}
          errorText="Please enter a note subject."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH (5)]}
          errorText="Enter lesson here.(at least 5 characters)"
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>ADD LESSON</Button>
      </form>
    </React.Fragment>
  );
};

export default NewLesson;

//todo: basic new lesson functionality
//adds a title for now???

//converting new lesson functionality
