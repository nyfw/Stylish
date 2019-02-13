import React from "react";
import Toggle from "./Toggle.jsx";
import Modal from "./Modal.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import { NavStyle, UnorderedList } from "../styles/Nav.jsx";

function Nav() {
  return (
    <NavStyle>
      <UnorderedList primary>
        <li>
          <Toggle
            render={({ on, toggle }) => (
              <div>
                <a onClick={toggle}>Register</a>
                <Modal on={on} toggle={toggle}>
                  <Register />
                </Modal>
              </div>
            )}
          />
        </li>
        <li>
          <Toggle
            render={({ on, toggle }) => (
              <div>
                <a onClick={toggle}>Login</a>
                <Modal on={on} toggle={toggle}>
                  <Login />
                </Modal>
              </div>
            )}
          />
        </li>
      </UnorderedList>

      <UnorderedList primary>
        <li>
          <a href="https://github.com/nyfw/nyfw">Github</a>
        </li>
      </UnorderedList>
    </NavStyle>
  );
}

export default Nav;
