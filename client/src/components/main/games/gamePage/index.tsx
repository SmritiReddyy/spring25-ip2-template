import React from 'react';
import './index.css';
import NimGamePage from '../nimGamePage';
import useGamePage from '../../../../hooks/useGamePage';

/**
 * Component to display the game page for a specific game type, including controls and game state.
 * @returns A React component rendering:
 * - A header with the game title and current game status.
 * - A "Leave Game" button to exit the current game.
 * - The game component specific to the game type (e.g., `NimGamePage` for "Nim").
 * - An error message if an error occurs during the game.
 */
const GamePage = () => {
  const { gameState, error, handleLeaveGame } = useGamePage();

  /**
   * Renders the appropriate game component based on the game type.
   * @param gameType The type of the game to render (e.g., "Nim").
   * @returns A React component corresponding to the specified game type, or a
   * fallback message for unknown types.
   */
  const renderGameComponent = (gameType: string) => {
    // TODO: Task 2 - Implement a switch-case statement to render the appropriate
    // game component based on the game type. Use a default <div> element to display
    // a message for unknown game types.
    if (!gameState) return null;

    switch (gameType) {
      case 'Nim':
        return <NimGamePage gameState={gameState} />;
      default:
        return <div>Unknown game type</div>;
    }
  };

  return (
    <div className='game-page'>
      <header className='game-header'>
        <h1>Nim Game</h1>
        <p className='game-status'>Status: {gameState ? gameState.state.status : 'Not started'}</p>
      </header>

      <div className='game-controls'>
        {/* TODO: Task 2 - Add a button that leaves the game on click.
        Use the class name 'btn-leave-game' for styling. */}
        <button className='btn-leave-game' onClick={handleLeaveGame}>
          Leave Game
        </button>
      </div>

      {/* TODO: Task 2 - Conditionally render the correct game component based on the type */}
      {gameState && renderGameComponent(gameState.gameType)}
      {/* Conditionally render an error message if an error occurs.
      Use a <div> element with the class name 'game-error' for styling. */}
      {error && <div className='game-error'>{error}</div>}
    </div>
  );
};

export default GamePage;
