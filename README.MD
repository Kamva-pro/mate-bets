## Mate Bets - chess betting

<html>
    <body>
        <h4>
            Mate Bets is an interactive chess betting website that lets chess enthusiasts 
            place bets on live games played on Lichess.
        </h4>
        <p>
            The website uses the lichess api to fetch live game data and lets the user
            track the game progress by watching along. 
        </p>
        <p>
            Betting odds are calculated using the current game evaluation and the elo of the 2
            opponents. The max<h3>
            How t
        <h3> evaluation users can place a bet on is +5(advantage for white) or
            -5(advantage for black).
        </p>
        <p>
            A game is unavailable for betting after the 10th move has been played. 
        </p>
        <p>
            Game results are carefully checked to ensure there are no errors. Winners are shortly
            after the result has been confirmed. 
        </p>
    </body>
</html>

## How to get started

<html>
    <body>
        <ol>
            <div>
                <h4>Clone the repository</h4>
                <p>Open up a terminal of your choice and run the following command: `git clone https://github.com/kamva-pro/matebets.git`
                </p>
            </div>
            <div>
                <h4>Install the dependencies</h4>
                <p>cd into the newly cloned project directory and navigate into the frontend directory by running `cd frontend`. Once inside the frontend directory install
                the dependencies by running: `npm install`</p>
            </div>
            <div>
                <h4>Run the program</h4>
                <p>To run the program you can run `npm run dev` inside your frontend folder. 
                Then navigate back into the root folder and then run `node backend/server.js 
                to start the server.`
                </p>
            </div>
            <div>
                <h4>Custom backend services</h4>
                <p>For better control you may want to have access to the database and other backend services. To achieve this you can create a new project on supabase and firebase. 
                Setup a database on Supabase and a email/password authentication on Firebase. 
                Follow the additional setup guides which they provide. 
            </div>
        </ol>
    </body>
</html>
