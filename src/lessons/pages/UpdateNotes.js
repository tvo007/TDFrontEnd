import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hooks' 

const DUMMY_NOTES = [
  {
    id: 'n1',
    title: 'first note',
    description: 'boiler plate description',
  },
];

const UpdateNotes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const lessonId = useParams ().lessonId;

  

  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    }

  }, false)

  const identifiedNote = DUMMY_NOTES.find (p => p.id === lessonId);

  useEffect(() => {
    if (identifiedNote) {
      setFormData({
        title: {
          value: identifiedNote.title,
          isValid: true
        },
        description: {
          value: identifiedNote.description,
          isValid: true
        }
      }, true);
    }
    

    setIsLoading(false);
  }, [setFormData, identifiedNote]);

  

  const lessonUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  }

  

  if (!identifiedNote) {
    return (
      <div className="center">
        <Card>
        <h2>Could not find notes.</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <form onSubmit={lessonUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE]}
        errorText='Please enter a valid title.'
        onInput={inputHandler}
        initValue={formState.inputs.title.value}
        initValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH]}
        errorText='Please enter a description. (5 char min)'
        onInput={inputHandler}
        initValue={formState.inputs.description.value}
        initValid={formState.inputs.description.isValid}
      />
      <Button type='submit' disabled={!formState.isValid}>Update Note</Button>
    </form>
  );
};

export default UpdateNotes;
