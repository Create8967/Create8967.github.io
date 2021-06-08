const ticksPerSec = 10;
const preDuration = 5;
const autonDuration = 15;
const teleopDuration = 75;
const postDuration = 10;
const shutdownDuration = 1;

const elegooModes =  Object.freeze({
	PreGame:	0,
	Autonomous:	1,
	Teleop:		2,
	PostGame:	3
});
const gameStates = Object.freeze({
	Idle:    1,
	PreGame:    2,
	Autonomous: 3,
	Teleop:     4,
	PostGame:   5,
	Shutdown:   6
});

class GameState {
	constructor() {
		this.beep = new Audio( "beep.wav" );
		this.autonSnd = new Audio( "autonstart.mp3" );
		this.teleSnd = new Audio( "threebells.mp3" );
		this.endSnd = new Audio( "buzzer.mp3" );
		this.abortSnd = new Audio( "matchabort.mp3" );
		this.enterIdle();
	}
	getTimeRemaining() {
		if( this.gameType == "teleop" && this.curState == gameStates.Teleop )
			return 0;
		return this.stateTicks / ticksPerSec;
	}
	getElegoMode() {
		return this.elegooMode;
	}
	isIdle() {
		return (this.curState == gameStates.Idle) ? true : false;
	}
	startGame( gameType ) {
		appendToConsole( '=> StartGame ' + gameType );
		this.gameType = gameType;
		switch( gameType ) {
		case "auto":
			this.enterPreGame();
			break;
		case "teleop":
			this.enterPreGame();
			break;
		case "full":
			this.enterPreGame();
			break;
		}
	}
	stopGame() {
		appendToConsole( '=> Stop Game' );
		this.abortSnd.play();
		this.enterShutdown();
	}
	enterIdle() {
		appendToConsole( '---> Idle <---' );
		this.gameType = 'none';
		this.curState = gameStates.Idle;
		this.stateTicks = 0;
		this.elegooMode = elegooModes.PreGame;
		startButton.value = 'Start';
	}
	enterPreGame() {
		appendToConsole( '---> PreGame' );
		this.stateTicks = preDuration * ticksPerSec;
		this.elegooMode = elegooModes.PreGame;
		this.curState = gameStates.PreGame;
		this.beep.play();
	}
	enterAuto() {
		appendToConsole( '---> Auto' );
		this.stateTicks = autonDuration * ticksPerSec;
		this.elegooMode = elegooModes.Autonomous;
		this.curState = gameStates.Autonomous;
	}
	enterTeleop() {
		appendToConsole( '---> Teleop' );
		this.stateTicks = teleopDuration * ticksPerSec;
		this.elegooMode = elegooModes.Teleop;
		this.curState = gameStates.Teleop;
	}
	enterPostGame() {
		appendToConsole( '---> PostGame' );
		this.stateTicks = postDuration * ticksPerSec;
		this.elegooMode = elegooModes.PostGame;
		this.curState = gameStates.PostGame;
	}
	enterShutdown() {
		if( this.curState != gameStates.Shutdown ) {
			appendToConsole( '---> Shutdown' );
			this.stateTicks = shutdownDuration * ticksPerSec;
			this.elegooMode = elegooModes.PostGame;
			this.curState = gameStates.Shutdown;
		}
	}
	invalidState() {
		alert( 'Invalid state: ' + this.curState + ' in ' + this.gameType );
		this.enterIdle();
	}
	update() {
		switch( this.curState ) {
		case gameStates.Idle:
			// Nothing to do
			break;
		case gameStates.PreGame:
			if(  this.stateTicks ) this.stateTicks--;
			if( (this.stateTicks % ticksPerSec) == 1 ) {
				if( this.stateTicks > ticksPerSec )
					this.beep.play();
				else {
					switch( this.gameType ) {
						case "auto":
							this.autonSnd.play();
							break;
						case "teleop":
							this.teleSnd.play();
							break;
						case "full":
							this.autonSnd.play();
							break;
					}
				}
			}
			if( !this.stateTicks ) {
				switch( this.gameType ) {
				case "auto":
					this.enterAuto();
					break;
				case "teleop":
					this.enterTeleop();
					break;
				case "full":
					this.enterAuto();
					break;
				default:
					this.enterIdle();
					break;
				}
			}
			break;
		case gameStates.Autonomous:
			if( this.stateTicks ) this.stateTicks--;
			if( this.stateTicks == 1 ) {
				switch( this.gameType ) {
					case "auto":
						this.endSnd.play();
						break;
					case "full":
						this.teleSnd.play();
						break;
				}
			}
			if( !this.stateTicks ) {
				switch( this.gameType ) {
				case "auto":
					this.enterPostGame();
					break;
				case "teleop": // should never get here!
					this.invalidState();
					break;
				case "full":
					this.enterTeleop();
					break;
				default:
					this.invalidState();;
					break;
				}
			}
			break;
		case gameStates.Teleop:
			if(  this.stateTicks ) this.stateTicks--;
			if( !this.stateTicks ) {
				this.endSnd.play();
				switch( this.gameType ) {
				case "auto": // should never get here!
					this.invalidState();
					break;
				case "teleop":  // run until user stops
					break;
				case "full":
					this.enterPostGame();
					break;
				default:
					this.invalidState();;
					break;
				}
			}
			break;
		case gameStates.PostGame:
			if(  this.stateTicks ) this.stateTicks--;
			if( !this.stateTicks ) {
				this.enterIdle();
			}
			break;
		case gameStates.Shutdown:
			if(  this.stateTicks ) this.stateTicks--;
			if( !this.stateTicks ) {
				this.enterIdle();
			}
			break;
		}
	}
};
