import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import LessonItem from './LessonItem';
import Button from '../../shared/components/FormElements/Button';
import './LessonPlan.css';

const LessonPlan = props => {
  if (props.items.length === 0) {
    return (
      <div className="lesson-plan center">
        <Card>
          <h2>Nothing learned yet. Get to work!!!</h2>
          <Button to="/lessons/new">Look at lesson.</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="lesson-plan">
      {props.items.map (lesson => (
        <LessonItem
          key={lesson.id}
          id={lesson.id}
          title={lesson.title}
          description={lesson.description}
          creatorId={lesson.creator}
          onDelete = {props.onDeleteLesson}
        />
      ))}

    </ul>
  );
  //implement skill sheet representation orientation here!
};

export default LessonPlan;

//for now: 12/15/19, dummy data to rep skills learnt
//in place of PlaceList.js (MERN-Max course)
