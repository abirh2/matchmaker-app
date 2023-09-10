import axios from "axios";
import { API_URL } from "../utils/apiPort";

/**
 * Adds the JWT to the header of an HTTP request
 */
const setHeaders = () =>{
//   axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('app-token');
}

export async function login(username, password) {
  
  try {
    const response = await axios.post(`${API_URL}/login`, `username=${username}&password=${password}`);
    // return the token
    return response.data.apptoken;
  } catch (err) {
    console.log('Error:', err.message);
    throw new Error(err.message);
    return false;
  }
  
}

export async function createUser(userInfo) {
  try{
    // add the token to the header
    // setHeaders();
    const response = await axios.post(`${API_URL}/users`,
        `name=${userInfo.name}&email=${userInfo.email}&username=${userInfo.username}&password=${userInfo.password}`);
    console.log("A response", response.data);
    return response.data.data;
  } catch (err){
    console.error('Error', err.message);
  }
}

// Function to check if username already exists
export async function checkUsernameExists(username) {
  try {
    setHeaders();
    const response = await axios.get(`${API_URL}/users/profiles/${username}`);
    const data = `${JSON.stringify(response.data)}`;
    if (data === '{"data":null}') {
      return false;
    } else if (!(data === '{"data":null}') && data != null) {
      return true;
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.log('There was an error checking if username exists:', error);
  }
}
  
  
// Function to check if email already exists
export async function checkEmailExists(email) {
  try {
    setHeaders();
    const response = await axios.get(`${API_URL}/userEmails/${email}`);
    const data = `${JSON.stringify(response.data)}`;
    if (data === '{"data":null}') {
      return false;
    } else if (!(data === '{"data":null}') && data != null) {
      return true;
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.log('There was an error checking if username exists:', error);
  }
}

export async function getProfilePicture(username) {
  try {
    setHeaders();
    const response = await axios.get(`${API_URL}/users/profiles/${username}`);
    return response.data.data.picture;
  } catch(error) {
    console.log('error', error.message);
  }
}


export const updatePassword = async (username, newPassword) => {
  const encodedUsername = encodeURIComponent(username)
  const encodedNewPassword = encodeURIComponent(newPassword)
  const response = await fetch(`http://localhost:3001/users/${encodedUsername}/password/${encodedNewPassword}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  const user = await response.json();
  return user;
};

export const updatePicture = async (username, newPicture) => {
  const encodedUsername = encodeURIComponent(username)
  const encodedNewPicture = encodeURIComponent(newPicture)
  const response = await fetch(`http://localhost:3001/users/${encodedUsername}/picture/${encodedNewPicture}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  const user = await response.json();
  return user;
};

export const updateUsername = async (oldUsername,newUsername) => {
  const encodedOld = encodeURIComponent(oldUsername)
  const encodedNew = encodeURIComponent(newUsername)
  console.log(encodedOld);
  console.log(encodedNew);
  const response = await fetch(`http://localhost:3001/users/${encodedOld}/${encodedNew}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    // const error = await response.text();
    // throw new Error(`Failed to create user: ${error}`);
  }
  const user = await response.json();
  return user;
};

export const updateProfilePicture = async (userId,userInfo) => {
  const response = await fetch(`http://localhost:3001/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });

  if (!response.ok) {
    // const error = await response.text();
    // throw new Error(`Failed to create user: ${error}`);
  }
  const user = await response.json();
  return user;
};

export const updatePrivacy = async (username,userInfo) => {
  const encodedName = encodeURIComponent(username)
  const response = await fetch(`http://localhost:3001/users/${encodedName}/privacy`);

  if (!response.ok) {
    // const error = await response.text();
    // throw new Error(`Failed to create user: ${error}`);
  }
  const user = await response.json();
  return user;
};

export async function getUserID(username) {
  try {
    setHeaders();
    const response = await axios.get(`${API_URL}/users/profiles/${username}`);
    return response.data.data._id;
  } catch(error) {
    console.log('error', error.message);
  }
}

export function getUserInfo(username) {
  const url = `${API_URL}/users?username=${username}`;
  
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        if (json.length > 0) {
          return json[0];
        } else {
          throw new Error('Invalid username or password');
        }
      })
      .catch(error => {
        console.log('Error fetching user data:', error);
        throw error;
      });
}

export async function getTopWeekly() {
  try {
    setHeaders();
    const response = await axios.get(`${API_URL}/topWeekly`);
    // const data = `${JSON.stringify(response.data)}`;
    const data = response.data;
    if (!(data === '{"data":null}') && data != null) {
      return data;
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.log('There was an error checking if username exists:', error);
  }
}
  
export function getAllUsers() {
  return fetch(`${API_URL}/users`).then(
    response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }
  ).catch(error => {
    console.log('Error fetching user data:', error);
    throw error;
  });
}
