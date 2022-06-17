import React, { useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import './style.css' 
import { useStoreContext } from '../../utils/GlobalState'

function CategoryMenu() {
  const [state, dispatch] = useStoreContext()
  const { categories } = state
  const { data: categoryData } = useQuery(QUERY_CATEGORIES)

  useEffect(() => {
    //if the category data exists or has changed from the response of useQuery, then run dispatch()
    if(categoryData){
      //execute our dispatch function with our action object indicating thet type of action and the data to set our state for categories to
      //the function runs immediately on load and passes in our function to update the global state and then the data that we're dependent on, categoryData and dispatch
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      })
    }
    //only rerun this useEffect if categoryData or dispatch changes
  }, [categoryData, dispatch])

  //update the click handler to update our global state instead of using the function we receive as a prop from the Home component.
  const handleCLick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    })
  }
  return (
    <div className='categoryMenu'>
    <h2>Choose a Category:</h2>
    <div className='categoryMenu_items'>
    {categories.map((item) => (
      <button className='categoryButtons'
        key={item._id}
        onClick={() => {
          handleCLick(item._id);
        }}
      >
        {item.name}
      </button>
    ))}
    
    </div>
    
      
    </div>
  );
}

export default CategoryMenu;
