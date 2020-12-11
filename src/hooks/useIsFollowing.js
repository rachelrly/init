
import { useState, useContext } from 'react';
import UserContext from '../contexts/userContext';

export function useIsFollowing(id) {
  const { user } = useContext(UserContext);
  return user.following.find(u => u.id === id);
};


