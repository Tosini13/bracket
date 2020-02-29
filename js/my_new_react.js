//CHECK - NOT NECESSARY

class TeamShow extends React.Component {
    constructor(props) {
        super(props);
        this.team = props.team;
        this.rights = props.rights;
        this.state = {
            value: this.team.name,
        }
        this.inputChange = this.inputChange.bind(this);
        this.teamName = React.createRef();
        this.saveChanges = this.saveChanges.bind(this);

        //NOT NECESSARY
        this.icon = 'icon-pencil';
    }

    inputChange(event) {
        if (this.rights === 'EDIT') {
            this.setState({ value: event.target.value });
        }

        //NOT NECESSARY
        this.icon = 'icon-soccer-ball';
    }

    saveChanges() {
        this.team.name = this.teamName.current.value;

        //NOT NECESSARY
        this.icon = 'icon-pencil';
    }

    render() {
        switch (this.rights) {
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
                <input className="team" type='text' value={this.props.team.name} onChange={this.inputChange} ref={this.teamName} />
                {this.piece}
            </div>
        );
    }
}


class MatchShow extends React.Component {
    constructor(props) {
        super(props);
        this.rights = 'EDIT';
        this.state = {
            mode: 1,
            match: this.props.match,
        }

        //REFERENCES
        this.goalHome = React.createRef();
        this.addHomeGoal = this.addHomeGoal.bind(this);
        this.lessHomeGoal = this.lessHomeGoal.bind(this);
        this.goalAway = React.createRef();
        this.addAwayGoal = this.addAwayGoal.bind(this);
        this.lessAwayGoal = this.lessAwayGoal.bind(this);
    }

    addHomeGoal() {
        if (this.state.mode == 1) {
            if (this.goalHome.current.value < 1000) {
                this.goalHome.current.value++;
                this.props.match.result.home = this.goalHome.current.value;
            }
        } else {
            console.log('Najpierw rozpocznij mecz');
        }
    }

    lessHomeGoal() {
        if (this.state.mode == 1) {
            if (this.goalHome.current.value > 0) {
                this.goalHome.current.value--;
                this.props.match.result.home = this.goalHome.current.value;
            }
        } else {
            console.log('Start match');
        }
    }

    addAwayGoal() {
        if (this.state.mode == 1) {
            if (this.goalAway.current.value < 1000) {
                this.goalAway.current.value++;
                this.props.match.result.away = this.goalAway.current.value;
            }
        } else {
            console.log('Start match');
        }
    }

    lessAwayGoal() {
        if (this.state.mode == 1) {
            if (this.goalAway.current.value > 0) {
                this.goalAway.current.value--;
                this.props.match.result.away = this.goalAway.current.value;
            }
        } else {
            console.log('Start match');
        }
    }

    render() {
        //MATCHES WITH UPDATING SCORE
        switch (this.rights) {
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
        //console.log('in match so state: ' + this.state.match.home.name + ': ' + this.state.match.result.home + ' - ' + this.state.match.result.away + ' :' + this.state.match.away.name);
        console.log('Current match: ' + this.props.match.home.name + ': ' + this.props.match.result.home + ' - ' + this.props.match.result.away + ' :' + this.props.match.away.name);
        return (
            <div>
                {this.piece}
                <div className='matchDatas'>
                    <TeamShow team={this.props.match.home} rights={false} />
                    <input className='goalHome goal' type='text' value={this.props.match.result.home} ref={this.goalHome} readOnly />
                    <i className='versus'>vs</i>
                    <input className='goalAway goal' type='text' value={this.props.match.result.away} ref={this.goalAway} readOnly />
                    <TeamShow team={this.props.match.away} rights={false} />
                </div>
            </div>
        );
    }
}


class MatchShow1 extends React.Component {
    constructor(props) {
        super(props);
        this.rights = 'EDIT';
        this.state = {
            goalHome: this.props.match.result.home,
            goalAway: this.props.match.result.away,
            mode: this.props.match.mode,
            match: this.props.match,
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

    whyCantChange() {
        if (this.state.match !== this.props.match) {
            this.setState({ match: this.props.match });
            console.log('NOT THE SAME');
        } else {
            console.log('THE SAME');
        }
        console.log('in match so state: ' + this.state.match.home.name + ': ' + this.state.match.result.home + ' - ' + this.state.match.result.away + ' :' + this.state.match.away.name);
        console.log('in match so props: ' + this.props.match.home.name + ': ' + this.props.match.result.home + ' - ' + this.props.match.result.away + ' :' + this.props.match.away.name);
    }

    startMatch() {
        //let match = this.state.match;
        if (this.state.mode == 2) {
            this.setState({ mode: 1 });
            console.log('ten mecz już się zakończył! Ale wznawiam');
        } else if (this.state.mode == 1) {
            this.setState({ mode: 2 });
            console.log('ten mecz jest już rozpoczęty');
        } else if (this.state.mode == 0) {
            this.setState({ mode: 1, goalHome: 0, goalAway: 0 });
            this.props.match.result.home = 0;
            this.props.match.result.away = 0;
            console.log('Rozpoczynam mecz');
        }
    }

    addHomeGoal() {
        if (this.state.mode == 1) {
            if (this.goalHome.current.value < 1000) {
                this.goalHome.current.value++;
                this.props.match.result.home = this.goalHome.current.value;
                this.setState({ goalHome: this.goalHome.current.value })
            }
        } else {
            console.log('Najpierw rozpocznij mecz');
        }
    }

    lessHomeGoal() {
        if (this.state.mode == 1) {
            if (this.goalHome.current.value > 0) {
                this.goalHome.current.value--;
                this.props.match.result.home = this.goalHome.current.value;
                this.setState({ goalHome: this.goalHome.current.value })
            }
        } else {
            console.log('Start match');
        }
    }

    addAwayGoal() {
        if (this.state.mode == 1) {
            if (this.goalAway.current.value < 1000) {
                this.goalAway.current.value++;
                this.props.match.result.away = this.goalAway.current.value;
                this.setState({ goalAway: this.goalAway.current.value })

            }
        } else {
            console.log('Start match');
        }
    }

    lessAwayGoal() {
        if (this.state.mode == 1) {
            if (this.goalAway.current.value > 0) {
                this.goalAway.current.value--;
                this.props.match.result.away = this.goalAway.current.value;
                this.setState({ goalAway: this.goalAway.current.value })
            }
        } else {
            console.log('Start match');
        }
    }

    updateState() {
        // console.log('beforeupdateState: ' + this.props.match.home.name + ': ' + this.props.match.result.home + ' - ' + this.props.match.result.away + ' :' + this.props.match.away.name);
        // if (this.state.goalHome != this.props.match.result.home) {
        //     this.setState({ goalHome: this.props.match.result.home });
        // }
        // if (this.state.goalAway != this.props.match.result.away) {
        //     this.setState({ goalAway: this.props.match.result.home });
        // }
        // if (this.state.mode != this.props.match.mode) {
        //     this.setState({ mode: this.props.match.mode });
        // }
        if (this.props.match == this.state.match) {
            console.log('the same');
        } else {
            console.log('not the same');
            this.setState({ match: this.props.match });
            this.state.match = this.props.match;
        }
        console.log('update -> state: ' + this.state.match.home.name + ': ' + this.state.match.result.home + ' - ' + this.state.match.result.away + ' :' + this.state.match.away.name);
        console.log('update -> props: ' + this.props.match.home.name + ': ' + this.props.match.result.home + ' - ' + this.props.match.result.away + ' :' + this.props.match.away.name);

    }

    render() {
        this.updateState();
        //this.state.match = this.props.match;
        // this.whyCantChange();
        console.log('mode: ' + this.state.mode);
        let modeClass = '';
        if (this.state.mode == 1) {
            this.modeButton = <a onClick={this.startMatch}><i className='icon-record'></i></a>
            modeClass += 'matchLive';
        } else {
            this.modeButton = <a onClick={this.startMatch}><i className='icon-play'></i></a>
        }
        //MATCHES WITH UPDATING SCORE
        switch (this.rights) {
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
                    <TeamShow team={this.props.match.home} rights={false} />
                    <input className='goalHome goal' type='text' value={this.state.goalHome} ref={this.goalHome} readOnly />
                    <i className='versus'>vs</i>
                    <input className='goalAway goal' type='text' value={this.state.goalAway} ref={this.goalAway} readOnly />
                    <TeamShow team={this.props.match.away} rights={false} />
                </div>
            </div>
        );

        //MATCHES
        return (
            <div className='matchDatas'>
                <input type='text' value={this.state.match.home.name} readOnly />
                vs
                <input type='text' value={this.state.match.away.name} readOnly />
            </div>
        );

        //MATCHES WITH SCORE
        return (
            <div className='matchDatas'>
                <input type='text' value={this.state.match.home.name} readOnly />
                <input className='goalHome' type='text' value={this.state.match.result.home} readOnly />
                vs
                    <input className='goalAway' type='text' value={this.state.match.result.away} readOnly />
                <input type='text' value={this.state.match.away.name} readOnly />
            </div>
        );

    }
}

// FOR BRACKETS

class BracketShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: props.mode,
        }
        this.rights = props.rights;
    }
    //show whole
    //show only round and arrow to next
    render() {
        this.brackets = this.props.stageFiltered.map((item, key) =>
            <li className='matches'>
                <a>{item.name}</a>
                <ul>
                    {this.matches = item.matches.map((match, k) =>
                        <li><MatchShow match={match} rights={this.rights} /></li>
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
            mode: 'stage'   //show 'stage' or 'all'
        }
    }

    render() {
        this.rights = this.props.rights;
        this.bracketStages = this.props.tournament.getAvailableStages();
        //STAGE LIST
        this.stages = this.bracketStages.map((item, key) =>
            <li><a onClick={() => { this.setState({ stageFiltered: this.props.tournament.bracketFilter(this.bracket, parseInt(item)) }); console.log(item); }}>{this.props.tournament.roundName[item]}</a></li>
        );
        return (
            <div className="group">
                <h2>{this.props.tournament.name}</h2>
                <ul>
                    <li><a onClick={() => { this.setState({ stageFiltered: this.props.tournament.bracketFilter(this.bracket, 0) }) }}>ALL</a></li>
                    {this.stages}
                </ul>
                <BracketShow tournament={this.props.tournament} stageFiltered={this.state.stageFiltered} mode={this.state.groupMode} rights={this.state.rights} />
            </div>
        );
    }
}

class ManagerShow extends React.Component {
    tournament = null;
    rights = 'EDIT';

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
            <TournamentShow tournament={this.tournament} rights={this.rights} />
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