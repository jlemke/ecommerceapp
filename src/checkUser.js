import { Auth } from 'aws-amplify';


// Takes a hook function as a parameter
export const checkUser = async (updateUser) => {

  const userData = await Auth
    .currentSession()
    .catch(err => console.log('error: ', err));

  if (!userData) {
    console.log('userData: ', userData);
    updateUser({});
    return;
  }

  // Destructure userData, get idToken.payload
  const { idToken: { payload }} = userData;

  // Check if user is admin, set isAuthorized
  const isAuthorized =
    payload['cognito:groups'] &&
    payload['cognito:groups'].includes('Admin');

  
  updateUser({
    username: payload['cognito:username'],
    isAuthorized
  });
};