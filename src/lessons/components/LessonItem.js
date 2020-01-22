import React, {useState, useContext} from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import {AuthContext} from '../../shared/context/auth-context';
import './LessonItem.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

// const checkMark = <FontAwesomeIcon icon={faCheck} />;

// const skillCheck = (skill) => {
//     return skill ? checkMark: '';
// }

// const skillCheckLeft = skill => {
//   return skill.left ? checkMark : 'X';
// };

// const skillCheckRight = skill => {
//   return skill.right ? checkMark : 'X';
// };

const LessonItem = ({id, title, description, creatorId}) => {
  const auth = useContext (AuthContext);
  const [showLesson, setShowLesson] = useState (false);
  const [showConfirmModal, setShowConfirmModal] = useState (false);

  const openLessonHandler = () => setShowLesson (true);

  const closeLessonHandler = () => setShowLesson (false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal (true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal (false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal (false);
    console.log ('DELETING...');
  };

  return (
    <React.Fragment>
      <Modal
        show={showLesson}
        onCancel={closeLessonHandler}
        header={title}
        contentClass="lesson-item__modal-content"
        footerClass="lesson-item__modal-actions"
        footer={<Button onClick={closeLessonHandler}>CLOSE</Button>}
      >

        <div>LESSONS GO HERE</div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="lesson-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
          </React.Fragment>
        }
      >
        <p>Are you sure you want to delete this lesson?</p>
      </Modal>
      <li className="lesson-item">
        <Card className="lesson-item__content">
          <div className="lesson-item__info" />
          <h2>PLACEHOLDER</h2>
          <h2>{title}</h2>
          <h2>{description}</h2>
          <div className="lesson-item__actions">
            <Button inverse onClick={openLessonHandler}>View Lesson</Button>
            {auth.isLoggedIn &&
              <Button to={`/lessons/${id}`}>Edit Lesson</Button>}
            {auth.isLoggedIn &&
              <Button danger onClick={showDeleteWarningHandler}>
                Delete Lesson
              </Button>}

          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default LessonItem;

//add lesson details here????
//omg we need a way to destructure the giant const block
//add inline styling to make it not single centered column

//on condensing const block, use destructuring.
//use skillCheckLeft vs skillCheckRIght???

/**
 * 
 * OLD SKILL CHECK FX:
 * 
 * const skillCheck = (skill) => {
    return skill ? checkMark: '';
}
 * 
 *  OLD CONST BLOCK
 * 
 *  const sideKick = [props.skills.kicksTag.sideKick.left, props.skills.kicksTag.sideKick.right]
 *  const hookKick = [props.skills.kicksTag.hookKick.left, props.skills.kicksTag.hookKick.right]
    const forwardRoll = [props.skills.flipsTag.forwardRoll.left, props.skills.flipsTag.backwardsRoll.right]
    const backwardRoll = [props.skills.flipsTag.backwardsRoll.left, props.skills.flipsTag.backwardsRoll.right]
    const bearCrawl = [props.skills.parkourTag.bearCrawl.left, props.skills.parkourTag.bearCrawl.right]
    const grapevine = [props.skills.parkourTag.grapevine.left, props.skills.parkourTag.grapevine.right]
    const toeTouch = [props.skills.flexibilityTag.toeTouch.left, props.skills.flexibilityTag.toeTouch.right]
    const bridge = [props.skills.flexibilityTag.bridge.left, props.skills.flexibilityTag.bridge.right]
    const jump180360 = [props.skills.twistsTag.jump180360.left, props.skills.twistsTag.jump180360.right]
    const inwardPivot = [props.skills.twistsTag.inwardPivot.left, props.skills.twistsTag.inwardPivot.right]
    const properSquat = [props.skills.strengthTag.properSquat.left, props.skills.strengthTag.properSquat.right]
    const vSit = [props.skills.strengthTag.vSit.left, props.skills.strengthTag.vSit.right]
    
    keeping commented out just in case, old hardcoded dummy lesson board
    <h2>{props.lessonName}</h2>
            <h2>Kicks</h2>
            <h2>
              Sidekick: L:
              {' '}
              {skillCheckLeft (sideKick)}
              {' '}
              R:
              {' '}
              {skillCheckRight (sideKick)}
            </h2>
            <h2>
              Hook Kick: L:
              {' '}
              {skillCheckLeft (hookKick)}
              {' '}
              R:
              {skillCheckRight (hookKick)}
            </h2>
            <h2>Flips</h2>
            <h2>
              Forward Roll: L:
              {' '}
              {skillCheckLeft (forwardRoll)}
              {' '}
              R:
              {' '}
              {skillCheckRight (forwardRoll)}
            </h2>
            <h2>
              Backward Roll: L:
              {' '}
              {skillCheckLeft (backwardRoll)}
              {' '}
              R:
              {' '}
              {skillCheckRight (backwardRoll)}
            </h2>
            <h2>Parkour</h2>
            <h2>
              Bearcrawl: L:
              {' '}
              {skillCheckLeft (bearCrawl)}
              {' '}
              R:
              {' '}
              {skillCheckRight (bearCrawl)}
            </h2>
            <h2>
              Grapevine: L:
              {' '}
              {skillCheckLeft (grapevine)}
              {' '}
              R:
              {' '}
              {skillCheckRight (grapevine)}
            </h2>
            <h2>Flexibility</h2>
            <h2>
              Toe Touch: L:
              {' '}
              {skillCheckLeft (toeTouch)}
              {' '}
              R:
              {' '}
              {skillCheckRight (toeTouch)}
            </h2>
            <h2>
              Bridge: L: {skillCheckLeft (bridge)} R: {skillCheckRight (bridge)}
            </h2>
            <h2>Twists</h2>
            <h2>
              Jump 180/360: L:
              {' '}
              {skillCheckLeft (jump180360)}
              {' '}
              R:
              {' '}
              {skillCheckRight (jump180360)}
            </h2>
            <h2>
              Inward Pivot: L:
              {' '}
              {skillCheckLeft (inwardPivot)}
              {' '}
              R:
              {' '}
              {skillCheckRight (inwardPivot)}
            </h2>
            <h2>Strength</h2>
            <h2>
              Proper Squat: L:
              {' '}
              {skillCheckLeft (properSquat)}
              {' '}
              R:
              {' '}
              {skillCheckRight (properSquat)}
            </h2>
            <h2>
              V-sit(15s): L: {skillCheckLeft (vSit)} R: {skillCheckRight (vSit)}
            </h2>
 */
