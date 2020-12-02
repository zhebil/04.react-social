import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <section className="welcome">
      <div className="container">
        <div className="welcome__inner">
          <h1 className="welcome__title title">Welcome to my website</h1>
          <div className="welcome__descr">
            <h2 className="welcome__do-title"> What can you to do?</h2>
            <ul className="welcome__do-list">
              <li className="welcome__do-item do-item">
                <h3 className="do-item__title">Find people</h3>
                <Button variant="outlined" component={Link} to="/people">
                  Go find someone
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
