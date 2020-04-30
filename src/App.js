import React, { useState } from "react";
import Home from './views/home/home';
import Game from "./views/game/game";
import socket from "socket.io-client";
// import { Provider, createStore } from "react-redux";
// import store from './store';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";
const player = {
  name1: '',
  name2: ''
}

export const playerContext = React.createContext(player)

function App() {
  var io = socket("http://172.25.1.62:3000");
  io.on("connect", () => {
    console.log("连接欧克");
  });
  return (
    <playerContext.Provider value={player}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home socket={io}></Home>
          </Route>
          <Route path="/game">
            <Game socket={io}></Game>
          </Route>
        </Switch>
      </BrowserRouter>
    </playerContext.Provider>
  )
}

export default App;
