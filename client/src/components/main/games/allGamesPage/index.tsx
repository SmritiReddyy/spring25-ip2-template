import React from 'react';
import './index.css';
import useAllGamesPage from '../../../../hooks/useAllGamesPage';
import GameCard from './gameCard';

/**
 * Component to display the "All Games" page, which provides functionality to view, create, and join games.
 * @returns A React component that includes:
 * - A "Create Game" button to open a modal for selecting a game type.
 * - A list of available games, each rendered using the `GameCard` component.
 * - A refresh button to reload the list of available games from the server.
 */
const AllGamesPage = () => {
  const {
    availableGames,
    handleJoin,
    fetchGames,
    isModalOpen,
    handleToggleModal,
    handleSelectGameType,
  } = useAllGamesPage();

  return (
    <div className='game-page'>
      <div className='game-controls'>
        <button className='btn-create-game' onClick={handleToggleModal}>
          Create Game
        </button>
      </div>

      {/* TODO: Task 2 - Conditionally render the modal based on the state variable */}
      {isModalOpen && (
        <div className='game-modal'>
          <div className='modal-content'>
            <h2>Select Game Type</h2>
            {/* TODO: Task 2 - Implement the handler function for the button to create a new game of Nim */}
            <button onClick={() => handleSelectGameType('Nim')}>Nim</button>
            <button onClick={handleToggleModal}>Cancel</button>
          </div>
        </div>
      )}

      <div className='game-available'>
        <div className='game-list'>
          <h2>Available Games</h2>
          {/* TODO: Task 2 - Create a button to fetch the list of games on click. 
          Use the class name 'btn-refresh-list' for styling. */}
          <div className='game-items'>
            {/* TODO: Task 2 - Map over the list of available games and render a `GameCard` component for each game. 
            Make sure the key for each component is _unique_. */}
            {/* NEW: render game cards */}
            {availableGames.map(game => (
              <GameCard key={game.gameID} game={game} handleJoin={handleJoin} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllGamesPage;
