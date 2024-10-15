import { AppDispatch } from '../Redux/store';
import { fetchEventsRequest, fetchEventsSuccess, fetchEventsFailure } from '../Redux/eventSlice';

export const fetchEvents = () => async (dispatch: AppDispatch) => {
  dispatch(fetchEventsRequest());
  try {
    const response = await fetch('http://localhost:3000/events');
    const data = await response.json();
    if (response.ok) {
      dispatch(fetchEventsSuccess(data));
    } else {
      dispatch(fetchEventsFailure('Error al obtener eventos'));
    }
  } catch {
    dispatch(fetchEventsFailure('Error de red'));
  }
};