import React from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hooks' 
import './NewNotes.css';


const NewNotes = () => {
  const [formState, inputHandler] = useForm({
    title: {
      value: '',
      isValid: false
    },

    description: {
      value: '',
      isValid: false
    }
  }, false);


 

  const lessonSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); //send this to backend
  }

  return (
    <form className="note-form" onSubmit={lessonSubmitHandler}>
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
        errorText="Enter notes here.(at least 5 characters)"
        onInput={inputHandler}
      />
      
      <Button type='submit' disabled={!formState.isValid}>ADD NOTE</Button>
    </form>
  );
};

export default NewNotes;

//todo: basic new lesson functionality
//adds a title for now???

//converting new lesson functionality