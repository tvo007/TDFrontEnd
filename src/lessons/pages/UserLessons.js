import React, {useState, useEffect} from 'react';
import LessonPlan from '../components/LessonPlan';
import {useParams} from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {useHttpClient} from '../../shared/hooks/http-hook';

const UserLessons = () => {
  const [loadedLessons, setLoadedLessons] = useState ();
  const {isLoading, error, sendRequest, clearError} = useHttpClient ();

  const userId = useParams ().userId;

  useEffect (
    () => {
      const fetchLessons = async () => {
        try {
          const responseData = await sendRequest (
            `http://localhost:5000/api/lessons/user/${userId}`
          );
          setLoadedLessons (responseData.lessons);
        } catch (err) {}
      };
      fetchLessons ();
    },
    [sendRequest, userId]
  );

  // const loadedLessons = DUMMY_LESSONS.filter(lesson => lesson.creator === userId);
  const lessonDeletedHandler = deletedLessonId => {
    setLoadedLessons (prevLessons =>
      prevLessons.filter (lesson => lesson.id !== deletedLessonId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading &&
        <div className="center">
          <LoadingSpinner />
        </div>}
      {!isLoading &&
        loadedLessons &&
        <LessonPlan
          items={loadedLessons}
          onDeleteLesson={lessonDeletedHandler}
        />}
    </React.Fragment>
  );
};

export default UserLessons;

//todo: fill out dummy data

/**
 * const DUMMY_LESSONS = [
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

blue 1 lesson structure
 */
