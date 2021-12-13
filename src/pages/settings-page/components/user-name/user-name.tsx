import React, { useState } from 'react';

import { useAppContext, useTooltipContext } from 'context';
import { TooltipTypes } from 'types';
import ChangeIcon from '!@svgr/webpack!assets/img/change-icon.svg';

const UserName: React.FC = () => {
  const { currentUser } = useAppContext();
  const { showTooltip } = useTooltipContext();

  const [name, setName] = useState(currentUser.displayName ?? '');
  const [isNameClicked, setIsNameClicked] = useState(false);

  const onNameSave = (): void => {
    currentUser
      .updateProfile({
        displayName: name,
      })
      .then(() => setIsNameClicked(false))
      .catch((err: any) => {
        showTooltip(TooltipTypes.Error, `User name didn't update: ${err.message}`);
      });
  };
  const onCancelingNameChange = (): void => {
    setName(currentUser.displayName ?? '');
    setIsNameClicked(false);
  };

  const onNameChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setName(evt.target.value);
  };

  return (
    <div className="settings-item">
      {isNameClicked ? (
        <>
          <input
            className="settings-item__field settings-item__field--name"
            type="text"
            name="name"
            onChange={onNameChange}
            placeholder="What is your name?"
            value={name}
          />
          <button className="settings-item__btn" onClick={onNameSave}>
            Save
          </button>
          <button
            className="settings-item__btn settings-item__btn--cancel"
            onClick={onCancelingNameChange}
          >
            Cancel
          </button>
        </>
      ) : (
        <div>
          <span className="settings-item__text">
            <b>Your name: </b>
            {currentUser.displayName ?? 'Anonymous'}
          </span>
          <button
            className="settings-item__edit-btn settings-item__edit-btn--name"
            onClick={() => setIsNameClicked(true)}
          >
            <ChangeIcon width="18px" height="18px" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserName;
