import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userDocRef = firebase.firestore().collection('users').doc(user._delegate.email);
        console.log('user id', user._delegate.email )
        userDocRef.onSnapshot((doc) => {
          if (doc.exists) {
            setIngredients(doc.data().food);
          }
        });
      }
    });
    return unsubscribe;
  }, []);

  function handleInputChange(event) {
    setNewIngredient(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const user = firebase.auth().currentUser;
    if (!user) {
      console.error('Cannot add ingredient: user is not authenticated');
      return;
    }

    const userDocRef = firebase.firestore().collection('users').doc(user._delegate.email);

    userDocRef.update({
      food: firebase.firestore.FieldValue.arrayUnion(newIngredient)
    })
    .then(() => {
      setNewIngredient('');
      console.log('this ingredient',newIngredient )
    })
    .catch((error) => {
      console.error('Error adding ingredient: ', error);
    });
  }


  
  function handleClearAll() {
    // Clear all the food items
    const user = firebase.auth().currentUser;
    if (!user) {
      console.error('Cannot add ingredient: user is not authenticated');
      return;
    }
    const userDocRef = firebase.firestore().collection('users').doc(user._delegate.email);

    userDocRef.update({
      food: []
    })
    .catch((error) => {
      console.error('Error clearing all ingredients: ', error);
    });
  }

  return (
    <div>
      <h1>My Ingredients</h1>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={newIngredient}
          onChange={handleInputChange}
        />
        <button type="submit">Add Ingredient</button>
        <button type="button" onClick={handleClearAll}>Clear All</button>
      </form>
    </div>
  );
}

export default Ingredients;