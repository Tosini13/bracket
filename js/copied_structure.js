// --------------------------------------------------------------------
// >>>>>>>>>>>>>>>>>>>>>>>>>>>TOURNAMENT<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// --------------------------------------------------------------------
var Tournament = (function () {
    function Tournament(name, participants_qtt, start_time, end_time) {
        var __isInheritance = __IS_INHERITANCE__;
        window.__IS_INHERITANCE__ = false;
        this.id = null;
        this.name = null;
        this.participants_qtt = null;
        this.group_qtt = null;
        this.play_offs_qtt = null;
        //i.e. quaterfinal
        this.start_date = null;
        this.end_date = null;
        this.no_last_place = null;
        this.mode = null;
        //0-group; 1-play-offs; 2-both
        this.groups = {};
        this.play_offs = null;
        this.teams = {};
        if (__isInheritance == false) {
            this.__construct(name, participants_qtt, start_time, end_time);
        }
    }
    //SET
    Tournament.prototype.set_group_qtt = function (arg) {
        if (arg > this.participants_qtt) {
            this.group_qtt = this.participants_qtt;
        } else {
            this.group_qtt = arg;
        }
    };
    //WHY I divide it one more time!
    Tournament.prototype.set_play_offs_qtt = function (arg) {
        __loop1: while (arg * 2 > this.participants_qtt) {
            //when there's more play offs than participants
            arg /= 2;
        }
        if (arg * 2 < this.group_qtt) {
            arg = this.group_qtt / 2;
        }
        //$this->play_offs_qtt = $arg / 2;
        this.play_offs_qtt = arg;
    };
    Tournament.prototype.set_host = function (name, logo, url) {
        this.host.set_name(name);
        this.host.set_logo(logo);
        this.host.set_url(url);
    };
    Tournament.prototype.set_sponsor = function (name, logo, url) {
        this.sponsor.set_name(name);
        this.sponsor.set_logo(logo);
        this.sponsor.set_url(url);
    };
    Tournament.prototype.set_start_date = function (arg) {
        this.start_date = this.datetime_validation(arg);
    };
    Tournament.prototype.set_end_date = function (arg) {
        this.end_date = this.datetime_validation(arg);
    };
    //FUNCTIONS
    Tournament.prototype.datetime_validation = function (arg) {
        if (arg == "") {
            return date("Ymd");
        } else {
            arg = str_replace("-", "", arg);
            arg = str_replace(":", "", arg);
            arg = str_replace("T", "", arg);
            arg = str_replace(" ", "", arg);
            var i;
            __loop1:
            for (i = strlen(arg); i < 14; i++) {
                arg += "0";
                //seconds
            }
        }
        return arg;
    };
    Tournament.prototype.declare_teams = function () {
        var i;
        __loop1:
        for (i = 0; i < this.participants_qtt; i++) {
            this.teams[i] = new Team();
            this.teams[i].set_name("Zespół nr " + i + 1);
        }
    };
    
    Tournament.prototype.declare_groups = function (group_qtt, play_offs_qtt) {
        var team_qtt;
        team_qtt = 0;
        this.set_group_qtt(group_qtt);
        this.set_play_offs_qtt(play_offs_qtt);
        //when odd number of participants
        if (this.get_group_qtt() != 1) {
            var rest_teams;
            rest_teams = this.get_participants_qtt() % this.get_group_qtt();
        } else {
            rest_teams = 0;
        }
        var i;
        for (i = 0; i < this.get_group_qtt(); i++) {
            //check if in group shouldn't be the same amount of teams
            if (rest_teams != 0) {
                var add;
                add = 1;
                rest_teams--;
            } else {
                add = 0;
            }
            //how many team should to be in particular group
            this.groups[i] = new Group("Grupa " + chr(65 + i), this.teams_qtt_in_group() + add);
            this.groups[i].promoted_teams_qtt(this.group_qtt, this.get_play_offs_qtt());
            //create teams in group
            var j;
            for (j = 0; j < this.groups[i].teams_qtt; j++) {
                this.groups[i].teams[j] = this.teams[team_qtt++];
            }
            this.groups[i].create_matches();
        }
    };

    Tournament.prototype.promoted_all_teams = function () {
        var promoted_all_teams;
        promoted_all_teams = {};
        var i;
        i = 0;
        var index;
        __loop1:
        for (index in this.groups) {
            var group;
            group = this.groups[index];
            var j;
            j = 0;
            __loop2:
            for (index in group.promoted_teams()) {
                var team;
                team = group.promoted_teams()[index];
                if (i == 0) {
                    promoted_all_teams[j] = {};
                }
                promoted_all_teams[j++][i] = team;
            }
            i++;
        }
        __loop1:
        for (i = count(promoted_all_teams) / 2; i < count(promoted_all_teams); i++) {
            //second half of teams
            var temp;
            temp = {};
            __loop2:
            for (j = 0; j < count(promoted_all_teams[i]); j++) {
                temp[j] = promoted_all_teams[i][count(promoted_all_teams[i]) - j - 1];
            }
            promoted_all_teams[i] = temp;
        }
        return promoted_all_teams;
    };
    Tournament.prototype.play_offs_preparation = function () {
        //order group of promoted teams for first round of play-offs
        //reverse
        var all;
        all = {};
        if (this.mode == 1) {
            //DECLARING TEAMS!!!!
            all[0] = {};
            all[0] = this.teams;
        } else {
            all = this.promoted_all_teams();
        }
        var places_qtt;
        places_qtt = count(all);
        var promoted_qtt;
        promoted_qtt = count(all[0]);
        //group_qtt?!?
        var new_order;
        new_order = {};
        var new_order_qtt;
        new_order_qtt = -1;
        var i;
        __loop1:
        for (i = 0; i < places_qtt; i++) {
            if (i % 2 == 0) {
                var place;
                place = i;
                new_order_qtt++;
            } else {
                place = places_qtt - i;
            }
            var j;
            __loop2:
            for (j = 0; j < promoted_qtt; j++) {
                if (i % 2 == 0) {
                    new_order[new_order_qtt * promoted_qtt + j] = new Match();
                    new_order[new_order_qtt * promoted_qtt + j].set_team1(all[place][j]);
                } else {
                    new_order[new_order_qtt * promoted_qtt + j].set_team2(all[place][j]);
                }
            }
        }
        return new_order;
    };
    Tournament.prototype.declare_play_offs = function (play_offs_qtt, no_last_place) {
        this.set_play_offs_qtt(play_offs_qtt);
        this.set_no_last_place(no_last_place);
        this.play_offs = new Play_offs(this.play_offs_qtt, this.no_last_place);
        this.play_offs.create_structure();
        this.play_offs.create_place_matches();
        this.play_offs.fill_structure_from_group(this.play_offs_preparation());
        //if groups are available!!!
    };
    Tournament.prototype.teams_qtt_in_group = function () {
        return intval(this.participants_qtt / this.group_qtt);
    };
    //CONSTRUCTORS
    Tournament.prototype.__construct = function (name, participants_qtt, start_time, end_time) {
        this.name = name;
        this.participants_qtt = participants_qtt;
        this.host = new Entity();
        this.sponsor = new Entity();
        this.declare_teams();
        this.set_start_date(start_time);
        this.set_end_date(end_time);
        /*
          //$this->mode = $mode;
          switch ($mode) {
          case 1:
          $this->play_offs = null;
          $this->groups = array();
          $this->declare_groups();
          break;
          case 2:
          $this->group = null;
          break;
          case 3:
          $this->groups = array();
          $this->declare_groups();
          break;
          }
         * */
    };
    Tournament.class = 'Tournament';
    return Tournament;
})();
// --------------------------------------------------------------------
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>GROUP<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// --------------------------------------------------------------------
var Group = (function () {
    function Group(name, teams_qtt) {
        var __isInheritance = __IS_INHERITANCE__;
        window.__IS_INHERITANCE__ = false;
        this.id = null;
        this.name = null;
        this.teams_qtt = null;
        this.teams = {};
        this.result = null;
        //aktualna tabela
        this.promoted_teams_qtt = null;
        this.matches = {};
        if (__isInheritance == false) {
            this.__construct(name, teams_qtt);
        }
    }
    //SET
    Group.prototype.set_name = function (arg) {
        this.name = arg;
    };
    Group.prototype.set_teams_qtt = function (arg) {
        this.teams_qtt = arg;
    };
    Group.prototype.set_promoted_teams_qtt = function (arg) {
        this.promoted_teams_qtt = arg;
    };
    Group.prototype.set_teams = function (arg) {
        this.teams = arg;
    };
    Group.prototype.set_id = function (arg) {
        this.id = arg;
    };
    //GET
    Group.prototype.get_name = function () {
        return this.name;
    };
    Group.prototype.get_teams_qtt = function () {
        return this.teams_qtt;
    };
    Group.prototype.get_promoted_teams_qtt = function () {
        return this.promoted_teams_qtt;
    };
    Group.prototype.get_teams = function () {
        return this.teams;
    };
    Group.prototype.get_matches = function () {
        return this.matches;
    };
    Group.prototype.get_id = function () {
        return this.id;
    };
    //FUNCTIONS
    Group.prototype.promoted_teams = function () {
        var promoted;
        promoted = {};
        var i;
        __loop1:
        for (i = 0; i < this.promoted_teams_qtt; i++) {
            array_push(promoted, this.teams[i]);
        }
        return promoted;
    };
    Group.prototype.promoted_teams_qtt = function (groups, play_off) {
        this.promoted_teams_qtt = play_off * 2 / groups;
    };
    //CONSTRUCTOR
    Group.prototype.__construct = function (name, teams_qtt) {
        this.name = name;
        this.teams_qtt = teams_qtt;
    };
    Group.class = 'Group';
    return Group;
})();
// --------------------------------------------------------------------
// >>>>>>>>>>>>>>>>>>>>>>>>>>GROUP TABLE<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// --------------------------------------------------------------------
var Group_table = (function () {
    function Group_table() {
        window.__IS_INHERITANCE__ = false;
        this.id = null;
        this.team = null;
        this.points = null;
        this.wins = null;
        this.loses = null;
        this.draws = null;
        this.scores = null;
        this.lost_goals = null;
    }
    //SET
    Group_table.prototype.set_id = function (arg) {
        this.id = arg;
    };
    //GET
    Group_table.prototype.get_id = function () {
        return this.id;
    };
    Group_table.class = 'Group_table';
    return Group_table;
})();
// --------------------------------------------------------------------
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>MATCH<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// --------------------------------------------------------------------
var Match = (function () {
    function Match() {
        var __isInheritance = __IS_INHERITANCE__;
        window.__IS_INHERITANCE__ = false;
        this.id = null;
        this.name = null;
        this.team1 = null;
        this.team2 = null;
        this.result = {};
        if (__isInheritance == false) {
            this.__construct();
        }
    }
    //SET
    Match.prototype.set_name = function (arg) {
        this.name = arg;
    };
    Match.prototype.set_team1 = function (arg) {
        this.team1 = arg;
    };
    Match.prototype.set_team2 = function (arg) {
        this.team2 = arg;
    };
    Match.prototype.set_result = function (home, away) {
        this.result[0] = home;
        this.result[1] = away;
    };
    Match.prototype.set_id = function (arg) {
        this.id = arg;
    };
    //GET
    Match.prototype.get_name = function () {
        return this.name;
    };
    Match.prototype.get_team1 = function () {
        return this.team1;
    };
    Match.prototype.get_team2 = function () {
        return this.team2;
    };
    Match.prototype.get_result = function () {
        return this.result;
    };
    Match.prototype.get_id = function () {
        return this.id;
    };
    //functions
    Match.prototype.winner = function () {
        if (this.result[0] > this.result[1]) {
            return this.team1;
        } else {
            return this.team2;
        }
    };
    //constructor
    Match.prototype.__construct = function () {
        this.team1 = new Team();
        this.team2 = new Team();
        this.set_result(null, null);
    };
    Match.class = 'Match';
    return Match;
})();
// --------------------------------------------------------------------
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>TEAM<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// --------------------------------------------------------------------
var Team = (function () {
    function Team() {
        window.__IS_INHERITANCE__ = false;
        this.name = null;
        this.id = null;
    }
    //SET
    Team.prototype.set_name = function (arg) {
        this.name = arg;
    };
    Team.prototype.set_id = function (arg) {
        this.id = arg;
    };
    //SET
    Team.prototype.get_name = function () {
        return this.name;
    };
    Team.prototype.get_id = function () {
        return this.id;
    };
    Team.class = 'Team';
    return Team;
})();