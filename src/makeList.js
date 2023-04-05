import React , {useState} from "react";
import { Link } from "react-router-dom";
import "./makeList.css";
import {API} from "aws-amplify";


/*
function makeList() {
  return (  
    <h1>Make list</h1>
  );
}
*/



function makeList() {
  const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState('');

  console.log(listName);
  console.log(listDescription);
  const myInit = {
    body: {name: listName, description: listDescription}, 
    headers: {} // OPTIONAL
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    async function createNewList() {
      try {
        console.log("submitted", listName, listDescription);
        console.log(myInit);
        await API.post("makeList", "/makeList", myInit);

      } catch (err) {
        console.log(err);
      }
    }
    createNewList();
  
  }


  return (
    <div class="makelist-area1">
      <div class="makelist-area">
        <div class="makelist-title"> Make your list</div>
        <div class="makelist-content">
          <form className="member-form" onSubmit={handleSubmit}>
            <div class="makelist-Fill-Ins" >
              <div class="makelistValidation">
                <label for="m-username">New List name</label>
                <input
                  type="text"
                  placeholder="Enter your new list name"
                  id="list-name"
                  value={listName} onChange={(event) => setListName(event.target.value)}
                />
                <small>Error message</small>
              </div>

              <div class="makelistValidation">
                <label for="m-email">Location Name:</label>
                <input
                type="text"
                placeholder="The vibes are immaculate"
                id="list-location"
                />
                <small>Error message</small>
              </div>

                <label for="text-entry">Enter List description:</label>
                <textarea id="text-entry" name="list-description" placeholder="Enter Description" rows="4"
                value={listDescription} onChange={(event) => setListDescription(event.target.value)}
                ></textarea>
                   

            </div>
            
              <button type="submit">Make list</button>
              
          </form>
        </div>
      </div>
    </div>
  );
}

export default makeList;