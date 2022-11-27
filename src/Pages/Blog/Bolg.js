import React from "react";
import bgImg from "../.././Assets/hero-shape-2.svg";
import Pageheader from "../../Components/PageHeader/PageHeader";

/**
 * 
 *  What are the different ways to manage a state in a React application?

13.2 How does prototypical inheritance work?

13.3 What is a unit test? Why should we write unit tests?

13.4 React vs. Angular vs. Vue?
 */

const Bolg = () => {
  return (
    <div>
      <Pageheader intro={"Blog"} bgImg={bgImg}></Pageheader>

      <div className="max-w-4xl mx-auto px-4 pb-24">
        <div className="questionBlock my-4 text-slate-100 leading-7">
          <h2 className="text-xl mb-3 text-cyan-500 ">
            What are the different ways to manage a state in a React
            application?
          </h2>
          <p>
            State management is on most important concept in react application,
            without knowing about state management we can do something that
            really worthy in react. there are sevral ways to manage state in
            react, here is the list of some populer library for managing state
            in react
          </p>
          <ul className="ml-6 list-decimal">
            <li>Recoil</li>
            <li>Jotai</li>
            <li>Redux</li>
            <li>Rematch</li>
          </ul>
        </div>
        <div className="questionBlock my-4 text-slate-100 leading-7">
          <h2 className="text-xl mb-3 text-cyan-500 ">
            How does prototypical inheritance work
          </h2>
          <p>
            Every object with its methods and properties contains an internal
            and hidden property known as Prototype. The Prototypal Inheritance
            is a feature in javascript used to add methods and properties in
            objects. It is a method by which an object can inherit the
            properties and methods of another object. Traditionally, in order to
            get and set the Prototype of an object, we use Object.getPrototypeOf
            and Object.setPrototypeOf. Nowadays, in modern language, it is being
            set using __proto__.
          </p>
        </div>
        <div className="questionBlock my-4 text-slate-100 leading-7">
          <h2 className="text-xl mb-3 text-cyan-500 ">
            What is a unit test? Why should we write unit tests?
          </h2>
          <p>
            Unit testing is a software development process in which the smallest
            testable parts of an application, called units, are individually and
            independently scrutinized for proper operation. This testing
            methodology is done during the development process by the software
            developers and sometimes QA staff. The main objective of unit
            testing is to isolate written code to test and determine if it works
            as intended. Unit testing is an important step in the development
            process, because if done correctly, it can help detect early flaws
            in code which may be more difficult to find in later testing stages.
          </p>
        </div>
        <div className="questionBlock my-4 text-slate-100 leading-7">
          <h2 className="text-xl mb-3 text-cyan-500 ">
            React vs. Angular vs. Vue?
          </h2>
          <div>
            <h2 className="text-cyan-400">React</h2>
            <p>
              React is a free and open-source front-end JavaScript library for
              building user interfaces based on UI components. It is maintained
              by Meta and a community of individual developers and companies.
            </p>
          </div>
          <div>
            <h2 className="text-cyan-400">Anguler</h2>
            <p>
              Angular is a TypeScript-based free and open-source web application
              framework led by the Angular Team at Google and by a community of
              individuals and corporations. Angular is a complete rewrite from
              the same team that built AngularJS
            </p>
          </div>
          <div>
            <h2 className="text-cyan-400">Vue</h2>
            <p>
              Vue.js is an open-source model view viewmodel front end JavaScript
              framework for building user interfaces and single-page
              applications. It was created by Evan You, and is maintained by him
              and the rest of the active core team members.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bolg;
