import React, { useState } from 'react';

import { useAppContext, useTooltipContext } from 'context';
import { TooltipTypes } from 'types';
import ChangeIcon from '!@svgr/webpack!assets/img/change-icon.svg';
import anonymousImg from 'assets/img/anonymous.jpg';

const UserAvatar: React.FC = () => {
  const { currentUser } = useAppContext();
  const { showTooltip } = useTooltipContext();

  const [photoUrl, setPhotoUrl] = useState(currentUser.photoURL ?? '');
  const [isAvatarClicked, setIsAvatarClicked] = useState(false);

  const onPhotoUrlSave = (): void => {
    currentUser
      .updateProfile({
        photoURL: photoUrl,
      })
      .then(() => setIsAvatarClicked(false))
      .catch((err: any) => {
        showTooltip(TooltipTypes.Error, `User avatar didn't update: ${err.message}`);
      });
  };

  const onCancelingPhotoUrlChange = (): void => {
    setPhotoUrl(currentUser.photoURL ?? '');
    setIsAvatarClicked(false);
  };

  const onPhotoUrlChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setPhotoUrl(evt.target.value);
  };

  return (
    <div className="settings-item settings-item__avatar-wrapper">
      <img
        className="settings-item__avatar"
        src={currentUser.photoURL ?? anonymousImg}
        width="100"
        height="100"
        alt="User's avatar"
      />

      {isAvatarClicked ? (
        <>
          {/* @todo Стоит сделать ref на инпут, чтобы бахать фокус сразу после его появления? */}
          <input
            className="settings-item__field settings-item__field--avatar"
            type="text"
            name="avatar"
            onChange={onPhotoUrlChange}
            placeholder="Type the link on your avatar"
            value={photoUrl}
          />
          <button className="settings-item__btn" onClick={onPhotoUrlSave}>
            Save
          </button>
          <button
            className="settings-item__btn settings-item__btn--cancel"
            onClick={onCancelingPhotoUrlChange}
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          className="settings-item__edit-btn settings-item__edit-btn--avatar"
          onClick={() => setIsAvatarClicked(true)}
        >
          <ChangeIcon width="24px" height="24px" />
        </button>
      )}
    </div>
  );
};

export default UserAvatar;
