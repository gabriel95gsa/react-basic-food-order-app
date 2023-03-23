import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const StyledMealsLoading = styled.section`
  text-align: center;
  color: white;
`;

const StyledMealsError = styled.section`
  text-align: center;
  color: red;
`;

const StyledAvailableMeals = styled.section`
  max-width: 60rem;
  width: 90%;
  margin: 2rem auto;
  animation: meals-appear 1s ease-out forwards;

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-food-order-app-8f357-default-rtdb.firebaseio.com/meals.json');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setLoadingError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <StyledMealsLoading>
        <p>Loading...</p>
      </StyledMealsLoading>
    );
  }

  if (loadingError) {
    return (
      <StyledMealsError>
        <p>{loadingError}</p>
      </StyledMealsError>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />
  ));

  return (
    <StyledAvailableMeals>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </StyledAvailableMeals>
  );
};

export default AvailableMeals;
