import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import useLoginContext from './useLoginContext';
import { createUser, loginUser } from '../services/userService';
import { User } from '../types';

/**
 * Custom hook to manage authentication logic, including handling input changes,
 * form submission, password visibility toggling, and error validation for both
 * login and signup processes.
 *
 * @param authType - Specifies the authentication type ('login' or 'signup').
 * @returns {Object} An object containing:
 *   - username: The current value of the username input.
 *   - password: The current value of the password input.
 *   - passwordConfirmation: The current value of the password confirmation input (for signup).
 *   - showPassword: Boolean indicating whether the password is visible.
 *   - err: The current error message, if any.
 *   - handleInputChange: Function to handle changes in input fields.
 *   - handleSubmit: Function to handle form submission.
 *   - togglePasswordVisibility: Function to toggle password visibility.
 */
const useAuth = (authType: 'login' | 'signup') => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState<string>('');
  const { setUser } = useLoginContext();
  const navigate = useNavigate();

  /**
   * Toggles the visibility of the password input field.
   */
  const togglePasswordVisibility = () => {
    // TODO - Task 1: Toggle password visibility
    setShowPassword(prevState => !prevState);
  };

  /**
   * Handles changes in input fields and updates the corresponding state.
   *
   * @param e - The input change event.
   * @param field - The field being updated ('username', 'password', or 'confirmPassword').
   */
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: 'username' | 'password' | 'confirmPassword',
  ) => {
    // TODO - Task 1: Handle input changes for the fields
    const fieldText = e.target.value.trim();

    if (field === 'username') {
      setUsername(fieldText);
    } else if (field === 'password') {
      setPassword(fieldText);
    } else if (field === 'confirmPassword') {
      setPasswordConfirmation(fieldText);
    }
  };

  /**
   * Validates the input fields for the form.
   * Ensures required fields are filled and passwords match (for signup).
   *
   * @returns {boolean} True if inputs are valid, false otherwise.
   */
  const validateInputs = (): boolean => {
    // TODO - Task 1: Validate inputs for login and signup forms
    // Display any errors to the user
    if (username === '' || password === '') {
      setErr('Please enter a username and password');
      return false;
    }

    if (authType === 'signup' && password !== passwordConfirmation) {
      setErr('Passwords do not match');
      return false;
    }

    return true;
  };

  /**
   * Handles the submission of the form.
   * Validates input, performs login/signup, and navigates to the home page on success.
   *
   * @param event - The form submission event.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO - Task 1: Validate inputs
    if (!validateInputs()) {
      return;
    }
    let user: User;

    try {
      // TODO - Task 1: Handle the form submission, calling appropriate API routes
      // based on the auth type
      if (authType === 'signup') {
        user = await createUser({ username, password });
      } else if (authType === 'login') {
        user = await loginUser({ username, password });
      } else {
        throw new Error('Invalid auth type');
      }

      // Redirect to home page on successful login/signup
      setUser(user);
      navigate('/home');
    } catch (error) {
      // TODO - Task 1: Display error message
      setErr((error as Error).message);
    }
  };

  return {
    username,
    password,
    passwordConfirmation,
    showPassword,
    err,
    handleInputChange,
    handleSubmit,
    togglePasswordVisibility,
  };
};

export default useAuth;
