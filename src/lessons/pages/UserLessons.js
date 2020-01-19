import React from 'react';
import LessonPlan from '../components/LessonPlan';
// import { useParams } from 'react-router-dom'

const DUMMY_LESSONS = [
  {
    lessonPlanOne: {
      lessonName: 'Blue 1',
      id: 'l1',

      kicksTag: {
        sideKick: {
          left: true,
          right: true,
        },

        hookKick: {
          left: true,
          right: true,
        },
      },

      flipsTag: {
        forwardRoll: {
          left: true,
          right: true,
        },

        backwardRoll: {
          left: true,
          right: true,
        },
      },
      parkourTag: {
        bearCrawl: {
          left: true,
          right: true,
        },

        grapevine: {
          left: true,
          right: true,
        },
      },
      flexibilityTag: {
        toeTouch: {
          left: true,
          right: true,
        },

        bridge: {
          left: true,
          right: true,
        },
      },
      twistsTag: {
        jump180360: {
          left: true,
          right: true,
        },

        inwardPivot: {
          left: true,
          right: true,
        },
      },
      strengthTag: {
        properSquat: {
          left: true,
          right: true,
        },

        vSit: {
          left: true,
          right: true,
        },
      },
    },
    
    notes: {
      title: 'stuff',
      description: 'stuff2',
      id: 'n1'
    }
  }
  
];

const UserLessons = () => {
  // const userId = useParams().userId;
  // const loadedLessons = DUMMY_LESSONS.filter(lesson => lesson.creator === userId);
  return <LessonPlan items={DUMMY_LESSONS} />;
};

export default UserLessons;

//todo: fill out dummy data 