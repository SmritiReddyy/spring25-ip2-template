import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGame, getGames } from '../services/gamesService';
import { GameInstance, GameType } from '../types';

/**
 * Custom hook to manage the state and logic for the "All Games" page, including fetching games,
 * creating a new game, and navigating to game details.
 * @returns An object containing the following:
 * - `availableGames`: The list of available game instances.
 * - `handleJoin`: A function to navigate to the game details page for a selected game.
 * - `fetchGames`: A function to fetch the list of available games.
 * - `isModalOpen`: A boolean indicating whether the game creation modal is open.
 * - `handleToggleModal`: A function to toggle the visibility of the game creation modal.
 * - `handleSelectGameType`: A function to select a game type, create a new game, and close the modal.
 */
const useAllGamesPage = () => {
  const navigate = useNavigate();
  const [availableGames, setAvailableGames] = useState<GameInstance[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchGames = async () => {
    // TODO: Task 2 - Fetch and update the list of available games state
    const games = await getGames(undefined, undefined);
    setAvailableGames(games);
  };

  const handleCreateGame = async (gameType: GameType) => {
    // TODO: Task 2 - Create a new game with the provided type
    await createGame(gameType);
    await fetchGames();
  };

  const handleJoin = (gameID: string) => {
    navigate(`/games/${gameID}`);
  };

  // TODO: Task 2 - Implement the `useEffect` hook to fetch the list of available games on component mount
  useEffect(() => {
    fetchGames();
  }, []);
  const handleToggleModal = () => {
    // TODO: Task 2 - Toggle the visibility of the game creation modal
    setIsModalOpen(prevState => !prevState);
  };

  const handleSelectGameType = (gameType: GameType) => {
    // TODO: Task 2 - Create a new game with the selected game type and toggle the modal
    handleCreateGame(gameType);
    handleToggleModal();
  };

  return {
    availableGames,
    handleJoin,
    fetchGames,
    isModalOpen,
    handleToggleModal,
    handleSelectGameType,
  };
};

export default useAllGamesPage;
