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
                <input className="team" type='text' value={this.state.value} onChange={this.inputChange} ref={this.teamName} />
                {this.piece}
            </div>
        );
    }
}


class MatchShow extends React.Component {
    constructor(props) {
        super(props);
        this.rights = props.rights;
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

    startMatch() {
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
            console.log('Rozpoczynam mecz');
        }
        this.setState({ match: match });
    }

    addHomeGoal() {
        if (this.state.match.mode == 1) {
            if (this.goalHome.current.value < 1000) {
                this.goalHome.current.value++;
                this.state.match.result.home = this.goalHome.current.value;
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
            }
        } else {
            console.log('Start match');
        }
    }

    addAwayGoal() {
        if (this.state.match.mode == 1) {
            if (this.goalAway.current.value < 1000) {
                this.goalAway.current.value++;
                this.state.match.result.away = this.goalAway.current.value;
            }
        } else {
            console.log('Start match');
        }
    }

    lessAwayGoal() {
        if (this.state.match.mode == 1) {
            if (this.goalAway.current.value > 0) {
                this.goalAway.current.value--;
                this.state.match.result.away = this.goalAway.current.value;
            }
        } else {
            console.log('Start match');
        }
    }

    render() {
        console.log('match mode in render: ' + this.state.match.mode);
        let modeClass = '';
        if (this.state.match.mode == 1) {
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
                    <TeamShow team={this.state.match.home} rights={false} />
                    <input className='goalHome goal' type='text' value={this.state.match.result.home} ref={this.goalHome} readOnly />
                    <i className='versus'>vs</i>
                    <input className='goalAway goal' type='text' value={this.state.match.result.away} ref={this.goalAway} readOnly />
                    <TeamShow team={this.state.match.away} rights={false} />
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
            stage: this.props.stageFiltered,
            mode: this.props.mode,
        }
        this.rights = props.rights;
        //this.state.group.tempStartEnd();
    }
    //show whole
    //show only round and arrow to next
    render() {
        //TEAMS LIST
        // this.bracket = this.state.group.table.map((item, key) =>
        //     <li><TeamShow team={item.team} rights={this.rights} /></li>
        // );
        this.brackets = this.state.stage.map((item, key) =>
            <li><a>{item.name}</a></li>
        );
        return (
            <ul class='bracket'>
                {this.brackets}
            </ul>
        );
    };
}


class GroupShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            group: this.props.group,
            mode: this.props.mode,
        }
        this.rights = props.rights;
        //this.state.group.tempStartEnd();
    }

    setGroup() {
        if (this.state.group != this.props.group) {
            this.setState({ group: this.props.group });
        }

        if (this.state.mode != this.props.mode) {
            this.setState({ mode: this.props.mode });
        }
    }

    render() {
        //prerequisites
        this.setGroup();
        //this.state.group.tempStartEnd();
        this.state.group.countTable();
        switch (this.state.mode) {
            case 'table':
                //TABLE
                this.table = this.state.group.table.map((item, key) =>
                    <tr><td>{item.team.name}</td><td>{item.points}</td><td>{item.goalsScored}</td><td>{item.goalsLost}</td></tr>
                );
                return (
                    <div className='table'>
                        <table>
                            <thead><tr><th>Zespół</th><th>punkty</th><th>strzelone</th><th>stracone</th></tr></thead>
                            <tbody>
                                {this.table}
                            </tbody>
                        </table>
                    </div >
                );
                break;
            case 'matches':
                //MATCH LIST
                this.matches = this.state.group.matches.map((item, key) =>
                    <li>
                        <MatchShow match={item} rights={this.rights} />
                    </li>
                );
                return (
                    <div className='matches'>
                        <ul>
                            {this.matches}
                        </ul>
                    </div>
                );
                break;
            case 'teams':
                //TEAMS LIST
                this.teams = this.state.group.table.map((item, key) =>
                    <li><TeamShow team={item.team} rights={this.rights} /></li>
                    // <input type='text' value={item.name} readOnly />
                );
                return (
                    <div className='teams'>
                        <ul>
                            {this.teams}
                        </ul>
                    </div>
                );
                break;
            case 'promote':
                //PROMOTED TEAMS
                let arr = this.state.group.promoteTeams();
                this.teams = arr.map((item, key) =>
                    <li><TeamShow team={item} rights={false} /></li>
                );
                return (
                    <div className='promoted'>
                        <ul>
                            {this.teams}
                        </ul>
                    </div>
                );
                break;
        }
    }
}

class TournamentShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentStage: this.props.tournament.firstRound,
            rights: this.props.rights,
            mode: 'stage'   //show 'stage' or 'all'
        }
        this.bracketStages = this.props.tournament.getAvailableStages();
    }

    render() {
        this.bracket = this.props.tournament.getWinnerBracket(this.props.tournament.finalMatch);
        this.stageFiltered = this.props.tournament.bracketFilter(this.bracket, parseInt(this.state.currentStage));
        //STAGE LIST
        this.stages = this.bracketStages.map((item, key) =>
            <li><a onClick={() => this.setState({ currentStage: item })}>{this.props.tournament.roundName[item]}</a></li>
        );
        // this.stages = this.bracket.map((item, key) =>
        //     <li><a>{item.name}</a></li>
        // );
        return (
            <div className="stages">
                <h2>{this.props.tournament.name}</h2>
                <ul>
                    {this.stages}
                </ul>
                <BracketShow stageFiltered={this.stageFiltered} mode={this.state.groupMode} rights={this.state.rights} />
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
    document.querySelector('#dashboardBracket').style.display = 'block';

    ReactDOM.render(
        <ManagerShow rights={rights} />,
        document.getElementById('dashboardBracket')
    );
}