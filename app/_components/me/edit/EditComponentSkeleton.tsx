import SkeletonBox from '../../common/skeleton/SkeletonBox';
import React from 'react';
import styled from 'styled-components';

const EditComponentSkeleton: React.FC = () => {
  return (
    <EditComponentSkeletonContainer>
      <SkeletonBox height="30px" width="100px" />
      <div className="edit-block">
        <SkeletonBox
          height="22.63px"
          width="100px"
          className="edit-block-label-skeleton"
        />
        <SkeletonBox height="32px" />
        <SkeletonBox
          height="22.63px"
          width="100px"
          className="edit-block-label-skeleton"
        />
        <div className="edit-input-and-button-wrapper">
          <SkeletonBox height="32px" width="100%" />
          <SkeletonBox height="32px" width="120px" />
        </div>
      </div>
      <div className="edit-block">
        <SkeletonBox
          height="22.63px"
          width="100px"
          className="edit-block-label-skeleton"
        />
        <SkeletonBox
          height="22.63px"
          width="100px"
          className="edit-block-sub-label-skeleton"
        />
        <div className="edit-input-and-button-wrapper">
          <SkeletonBox height="32px" />
          <SkeletonBox height="32px" width="120px" />
        </div>
        <SkeletonBox
          height="22.63px"
          width="100px"
          className="edit-block-label-skeleton"
        />
        <div className="edit-input-and-button-wrapper">
          <SkeletonBox height="32px" />
          <SkeletonBox height="32px" width="120px" />
        </div>
      </div>
      <div className="edit-block">
        <SkeletonBox height="32px" />
        <div className="edit-input-and-button-wrapper ">
          <div className="edit-withdrawl-label-wrapper">
            <SkeletonBox
              height="22.63px"
              width="100px"
              className="edit-block-label-skeleton"
            />
            <SkeletonBox
              height="22.63px"
              width="100px"
              className="edit-block-sub-label-skeleton"
            />
          </div>
          <SkeletonBox height="32px" width="120px" />
        </div>
      </div>
    </EditComponentSkeletonContainer>
  );
};

export default EditComponentSkeleton;

const EditComponentSkeletonContainer = styled.div`
  width: 100%;
  .edit-block-label-skeleton {
    margin: 15px 0 2px 0;
  }
  .edit-block-sub-label-skeleton {
    margin-top: 5px;
  }
  max-width: 300px;
  margin: 50px auto;

  .edit-input-and-button-wrapper {
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }

  .edit-block {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
  }
  .edit-withdrawal-button {
    margin-top: 10px;
  }
  .edit-withdrawl-label-wrapper {
    display: flex;
    flex-direction: column;
  }
`;
