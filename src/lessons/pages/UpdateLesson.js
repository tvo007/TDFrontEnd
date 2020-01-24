import React, {useEffect, useState, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {useForm} from '../../shared/hooks/form-hooks';
import {useHttpClient} from '../../shared/hooks/http-hook';
import {AuthContext} from '../../shared/context/auth-context';

const UpdateLesson = () => {
  const auth = useContext (AuthContext);
  const {isLoading, error, sendRequest, clearError} = useHttpClient ();
  const [loadedLesson, setLoadedLesson] = useState ();
  const lessonId = useParams ().lessonId;
  const history = useHistory ();

  const [formState, inputHandler, setFormData] = useForm (
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

  useEffect (
    () => {
      const fetchLesson = async () => {
        try {
          const responseData = await sendRequest (
            `http://localhost:5000/api/lessons/${lessonId}`
          );
          setLoadedLesson (responseData.lesson);
          setFormData (
            {
              title: {
                value: responseData.lesson.title,
                isValid: true,
              },
              description: {
                value: responseData.lesson.description,
                isValid: true,
              },
            },
            true
          );
        } catch (err) {}
      };
      fetchLesson ();
    },
    [sendRequest, lessonId, setFormData]
  );

  const lessonUpdateSubmitHandler = async event => {
    event.preventDefault ();
    try {
      await sendRequest (
        `http://localhost:5000/api/lessons/${lessonId}`,
        'PATCH',
        JSON.stringify ({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      history.push ('/' + auth.userId + '/lessons');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedLesson && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find lesson.</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading &&
        loadedLesson &&
        <form onSubmit={lessonUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initValue={loadedLesson.title}
            initValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH]}
            errorText="Please enter a description. (5 char min)"
            onInput={inputHandler}
            initValue={loadedLesson.description}
            initValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Update Note
          </Button>
        </form>}
    </React.Fragment>
  );
};

export default UpdateLesson;
