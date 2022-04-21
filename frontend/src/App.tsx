import { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import './App.css';
import Routing from './Routing';
import { getUserId } from "./store/User.slice"

function App() {
  const dispatch = useDispatch();
  let userId: string = useSelector((state: RootState): string => state.users.id);

  useEffect(() => {
    getUserId(dispatch)
  }, [dispatch])

  return (
    <Suspense fallback={<h1>loading...</h1>}>
      {
      userId ?
      <Routing /> :
      false
      }
    </Suspense>
  );
}

export default App;
