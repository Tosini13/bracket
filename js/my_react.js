//CHECK - NOT NECESSARY

class TeamShow extends React.Component {
    constructor(props) {
        super(props);
        this.team = props.team;
        this.state = {
            name: this.team.name,
        }
        this.inputChange = this.inputChange.bind(this);
        this.teamName = React.createRef();
        this.saveChanges = this.saveChanges.bind(this);

        //NOT NECESSARY
        this.icon = 'icon-pencil';
    }

    inputChange(event) {
        if (this.props.rights === 'EDIT') {
            this.setState({ name: event.target.value });
        }

        //NOT NECESSARY
        this.icon = 'icon-soccer-ball';
    }

    saveChanges() {
        this.team.name = this.teamName.current.value;

        //NOT NECESSARY
        this.icon = 'icon-pencil';
    }

    componentDidUpdate(prevProps) {
        if (this.props.team !== prevProps.team) {
            this.team = this.props.team;
            this.setState({ name: this.props.team.name })
        }
    }

    render() {
        switch (this.props.rights) {
            case 'EDIT':
                this.piece = <a onClick={this.saveChanges}><i className={this.icon}></i></a>
                this.inputMode = ''
                break;
            default:
                this.piece = '';
                this.inputMode = 'readonly';
        }
        return (
            <div>
                <input className="team" type='text' value={this.state.name} onChange={this.inputChange} ref={this.teamName} />
                {this.piece}
            </div>
        );
    }
}

class MatchShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            match: props.match,
        }

        //REFERENCES
        this.goalHome = React.createRef();
        this.addHomeGoal = this.addHomeGoal.bind(this);
        this.lessHomeGoal = this.lessHomeGoal.bind(this);
        this.goalAway = React.createRef();
        this.addAwayGoal = this.addAwayGoal.bind(this);
        this.lessAwayGoal = this.lessAwayGoal.bind(this);
        this.startMatch = this.startMatch.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match !== prevProps.match) {
            this.setState({ match: this.props.match });
        }
    }


    startMatch() {
        if (this.props.prevFinished) {
            let match = this.state.match;
            if (this.state.match.mode == 2) {
                this.state.match.mode = 1;
                console.log('ten mecz już się zakończył! Ale wznawiam');
            } else if (this.state.match.mode == 1) {
                match.mode = 2;
                console.log('ten mecz jest już rozpoczęty');
            } else if (this.state.match.mode == 0) {
                match.mode = 1;
                match.result.home = 0;
                match.result.away = 0;
                //this.setState({ goalHome: 0 });
                //this.setState({ goalAway: 0 });
                console.log('Rozpoczynam mecz');
            }
            this.setState({ match: match });
        } else {
            console.log('Poprzednie mecze jeszcze się nie zakończyły');
        }
    }

    addHomeGoal() {
        if (this.state.match.mode == 1) {
            if (this.goalHome.current.value < 1000) {
                this.goalHome.current.value++;
                this.state.match.result.home = this.goalHome.current.value;
                //this.setState({ goalHome: this.goalHome.current.value });
            }
        } else {
            console.log('Najpierw rozpocznij mecz');
        }
    }

    lessHomeGoal() {
        if (this.state.match.mode == 1) {
            if (this.goalHome.current.value > 0) {
                this.goalHome.current.value--;
                this.state.match.result.home = this.goalHome.current.value;
                //this.setState({ goalHome: this.goalHome.current.value });
            }
        } else {
            console.log('Najpierw rozpocznij mecz');
        }
    }

    addAwayGoal() {
        if (this.state.match.mode == 1) {
            if (this.goalAway.current.value < 1000) {
                this.goalAway.current.value++;
                this.state.match.result.away = this.goalAway.current.value;
                //this.setState({ goalAway: this.goalAway.current.value });
            }
        } else {
            console.log('Najpierw rozpocznij mecz');
        }
    }

    lessAwayGoal() {
        if (this.state.match.mode == 1) {
            if (this.goalAway.current.value > 0) {
                this.goalAway.current.value--;
                this.state.match.result.away = this.goalAway.current.value;
                //this.setState({ goalAway: this.goalAway.current.value });
            }
        } else {
            console.log('Najpierw rozpocznij mecz');
        }
    }

    render() {
        let modeClass = '';
        if (this.state.match.mode == 1) {
            this.modeButton = <a onClick={this.startMatch}><i className='icon-record'></i></a>
            modeClass += 'matchLive';
        } else {
            this.modeButton = <a onClick={this.startMatch}><i className='icon-play'></i></a>
        }
        //MATCHES WITH UPDATING SCORE
        switch (this.props.rights) {
            case 'EDIT':
                this.piece =
                    <div className='matchDashboard'>
                        <a onClick={this.lessHomeGoal}><i className='icon-minus-circled'></i></a>
                        <a onClick={this.addHomeGoal}><i className='icon-plus-circled'></i></a>
                        {this.modeButton}
                        <a onClick={this.lessAwayGoal}><i className='icon-minus-circled'></i></a>
                        <a onClick={this.addAwayGoal}><i className='icon-plus-circled'></i></a>
                    </div>
                break;
            default:
                this.piece = '';
        }
        return (
            <div className={modeClass}>
                {this.piece}
                <div className='matchDatas'>
                    <TeamShow team={this.state.match.home} rights={this.props.teamRights} />
                    <input className='goalHome goal' type='text' value={this.state.match.result.home} ref={this.goalHome} readOnly />
                    <i className='versus'>vs</i>
                    <input className='goalAway goal' type='text' value={this.state.match.result.away} ref={this.goalAway} readOnly />
                    <TeamShow team={this.state.match.away} rights={this.props.teamRights} />
                </div>
            </div>
        );
    }
}

// FOR BRACKETS

class BracketShow extends React.Component {

    //show whole
    //show only round and arrow to next
    render() {
        this.brackets = this.props.stageFiltered.map((item, key) =>
            <li className='matches'>
                <hr />

                <a>{item.name}</a>
                <ul>
                    {this.matches = item.matches.map((match, k) =>
                        <li><MatchShow match={match} rights={this.props.rights} teamRights={this.props.teamRights} prevFinished={item.lastMatchesDidFinished()} /></li>
                    )}
                </ul>
            </li>

        );
        return (
            <ul className='bracket'>
                {this.brackets}
            </ul>
        );
    };
}

class TournamentShow extends React.Component {

    constructor(props) {
        super(props);
        // this.bracketStages = this.props.tournament.getAvailableStages();
        this.bracket = this.props.tournament.getWinnerBracket(this.props.tournament.finalMatch);
        this.state = {
            stageFiltered: this.props.tournament.bracketFilter(this.bracket, parseInt(this.props.tournament.firstRound)),
            mode: parseInt(this.props.tournament.firstRound)   //show 'stage' or 'all'
        }
    }

    render() {
        this.bracketStages = this.props.tournament.getAvailableStages();
        //STAGE LIST
        this.stages = this.bracketStages.map((item, key) => {
            this.buttonClass = ['button'];
            if (parseInt(this.state.mode) == parseInt(item)) {
                this.buttonClass.push('clickedButton');
            }
            return <li><a className={this.buttonClass.join(' ')} onClick={() => { this.setState({ stageFiltered: this.props.tournament.bracketFilter(this.bracket, parseInt(item)), mode: item }); }}>{this.props.tournament.roundName[item]}</a></li>
        });
        this.buttonClass = ['button'];
        if (parseInt(this.state.mode) == 0) {
            this.buttonClass.push('clickedButton');
        }
        var rights = false;
        if (this.state.mode == parseInt(this.props.tournament.firstRound)) {
            rights = this.props.rights;
        }
        return (
            <div className="group">
                <h2>{this.props.tournament.name}</h2>
                <ul>
                    <li><a className={this.buttonClass.join(' ')} onClick={() => { this.setState({ stageFiltered: this.props.tournament.bracketFilter(this.bracket, 0), mode: 0 }) }}>ALL</a></li>
                    {this.stages}
                </ul>
                <BracketShow tournament={this.props.tournament} stageFiltered={this.state.stageFiltered} mode={this.state.groupMode} rights={this.props.rights} teamRights={rights} />
            </div>
        );
    }
}

class ManagerShow extends React.Component {
    tournament = null;

    groupInit() {
        var bracketNo = document.getElementsByName('play_offs')[0].value;
        var returnGameBrcaket = document.getElementsByName('revange_bracket')[0].checked;
        // #BRACKET
        this.tournament = new Tournament(bracketNo, returnGameBrcaket);
        this.tournament.createWinnerBracket();
        //this.tournament.showWinnerBracket(this.tournament.finalMatch);//temp
        this.tournament.name = document.getElementsByName('name')[0].value;
    }


    render() {
        this.groupInit();

        return (
            <TournamentShow tournament={this.tournament} rights={this.props.rights} />
        );
    }
}

// ========================================

function createGroup(rights) {
    document.querySelector('#formCreation').style.display = 'none';
    document.querySelector('#dashboardGroups').style.display = 'block';

    ReactDOM.render(
        <ManagerShow rights={rights} />,
        document.getElementById('dashboardGroups')
    );
}