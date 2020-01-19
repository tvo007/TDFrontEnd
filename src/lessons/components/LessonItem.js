import React, {useState, useContext} from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import {AuthContext} from '../../shared/context/auth-context';
import './LessonItem.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

const checkMark = <FontAwesomeIcon icon={faCheck} />;

// const skillCheck = (skill) => {
//     return skill ? checkMark: '';
// }

const skillCheckLeft = skill => {
  return skill.left ? checkMark : 'X';
};

const skillCheckRight = skill => {
  return skill.right ? checkMark : 'X';
};

const LessonItem = props => {
  const auth = useContext (AuthContext);
  const [showNotes, setShowNotes] = useState (false);
  const [showConfirmModal, setShowConfirmModal] = useState (false);

  const openNotesHandler = () => setShowNotes (true);

  const closeNotesHandler = () => setShowNotes (false);

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

  const blue1Skills = props.skills;
  const {sideKick, hookKick} = blue1Skills.kicksTag;
  const {forwardRoll, backwardRoll} = blue1Skills.flipsTag;
  const {bearCrawl, grapevine} = blue1Skills.parkourTag;
  const {toeTouch, bridge} = blue1Skills.flexibilityTag;
  const {jump180360, inwardPivot} = blue1Skills.twistsTag;
  const {properSquat, vSit} = blue1Skills.strengthTag;

  return (
    <React.Fragment>
      <Modal
        show={showNotes}
        onCancel={closeNotesHandler}
        header={props.lessonName}
        contentClass="lesson-item__modal-content"
        footerClass="lesson-item__modal-actions"
        footer={<Button onClick={closeNotesHandler}>CLOSE</Button>}
      >

        <div>NOTES GO HERE</div>
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
        <p>Are you sure you want to delete this note?</p>
      </Modal>
      <li className="lesson-item">
        <Card className="lesson-item__content">
          <div className="lesson-item__info">
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
          </div>
          <div className="lesson-item__actions">
            <Button inverse onClick={openNotesHandler}>View Notes</Button>
            {auth.isLoggedIn &&
              <Button to={`/lessons/${props.id}`}>Edit Notes</Button>}
            {auth.isLoggedIn &&
              <Button danger onClick={showDeleteWarningHandler}>
                Delete Notes
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
    
 */
