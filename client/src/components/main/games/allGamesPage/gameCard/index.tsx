import React from 'react';
import './index.css';
import { GameInstance } from '../../../../../types';

/**
 * Component to display a game card with details about a specific game instance.
 * @param game The game instance to display.
 * @param handleJoin Function to handle joining the game. Takes the game ID as an argument.
 * @returns A React component rendering the game details and a join button if the game is waiting to start.
 */
const GameCard = ({
  game,
  handleJoin,
}: {
  game: GameInstance;
  handleJoin: (gameID: string) => void;
}) => (
  <div className='game-item'>
    <p>
      <strong>Game ID:</strong> {game.gameID} | <strong>Status:</strong> {game.state.status}
    </p>
    <ul className='game-players'>
      {game.players.map((player: string) => (
        <li key={`${game.gameID}-${player}`}>{player}</li>
      ))}
    </ul>
    {/* TODO: Task 2 - Create a "Join Game" button, which joins this game ID on click. 
    Make sure that the button is only displayed for a game that is waiting to start.
    Use the class name 'btn-join-game' for styling. */}
    {game.state.status === 'WAITING_TO_START' && (
      <button className='btn-join-game' onClick={() => handleJoin(game.gameID)}>
        Join Game
      </button>
    )}
  </div>
);

export default GameCard;
