import requests

def get_current_or_last_game(username):
    """
    Fetch the ongoing or last game played by the user.
    """
    url = f"https://lichess.org/api/user/{username}/current-game"
    headers = {
        "Accept": "application/json",
    }
    
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            try:
                game_data = response.json()
                return game_data
            except ValueError:
                print(f"Invalid JSON response for user: {username}")
                return None
        elif response.status_code == 204:
            print(f"No ongoing or recent game found for user: {username}")
            return None
        else:
            print(f"Error fetching game for {username}. Status code: {response.status_code}")
            return None
    except requests.RequestException as e:
        print(f"Error occurred while fetching data for {username}: {e}")
        return None

def get_game_between_players(player_one, player_two):
    """
    Check if the ongoing or last games of two users are against each other.
    """
    game_one = get_current_or_last_game(player_one)
    game_two = get_current_or_last_game(player_two)
    
    if not game_one or not game_two:
        return "One or both players have no ongoing or recent games or an error occurred."
    
    # Check if the games are the same
    if game_one.get("id") == game_two.get("id"):
        return game_one
    else:
        return f"No ongoing or recent game found between {player_one} and {player_two}."

player_one = input("Enter Player One's username: ")
player_two = input("Enter Player Two's username: ")

game_data = get_game_between_players(player_one, player_two)

if isinstance(game_data, dict):
    print("Game data for the match between players:")
    print(game_data)
else:
    print(game_data)
