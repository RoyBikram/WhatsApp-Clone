import { createStore } from 'redux';
import RootReducer from './RootReducer'

const Store = createStore(RootReducer)
export default Store