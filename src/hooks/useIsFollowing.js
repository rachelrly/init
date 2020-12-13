
import { useState, useContext } from 'react';
import UserContext from '../contexts/userContext';
import FollowService from '../services/follow-service';

export function useIsFollowing(id) {
  const { user } = useContext(UserContext);
  return user.following.find(u => u.id === id);
};


export function useCheckandGetFollows() {
  const { user, setUserFollows } = useContext(UserContext);

  if (!user.following || !user.followers) {
    getFollows()
  }

  const getFollows = async () => {
    const { followingUser, followedByUser } = await FollowService.getFollowLists();
    setUserFollows({ following: followedByUser, followers: followingUser })
  }

  return;
}

